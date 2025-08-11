import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
import psycopg2
import bcrypt
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# JWT config
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'supersecret')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)

# PostgreSQL connection
conn = psycopg2.connect(
    dbname=os.getenv('PGDATABASE', 'postgres'),
    user=os.getenv('PGUSER', 'postgres'),
    password=os.getenv('PGPASSWORD', 'G8v5s11@h12'),
    host=os.getenv('PGHOST', 'localhost'),
    port=os.getenv('PGPORT', 5432)
)
conn.autocommit = True

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=%s", (username,))
    if cur.fetchone():
        return jsonify({'error': 'User exists'}), 400
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed))
    return jsonify({'success': True})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=%s", (username,))
    user = cur.fetchone()
    if not user or not bcrypt.checkpw(password.encode(), user[2].encode()):
        return jsonify({'error': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=username, expires_delta=False)
    return jsonify({'token': access_token})

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    cur = conn.cursor()
    cur.execute("""
        SELECT b.id, b.title, b.content, b.imageurl, b.created_at, u.username
        FROM blogs b
        JOIN users u ON b.user_id=u.id
        ORDER BY b.id DESC
    """)
    blogs = [
        {
            'id': row[0],
            'title': row[1],
            'content': row[2],
            'imageurl': row[3],
            'createdAt': row[4].isoformat() if row[4] else None,
            'author': row[5]
        }
        for row in cur.fetchall()
    ]
    return jsonify(blogs)

@app.route('/api/blogs', methods=['POST'])
@jwt_required()
def create_blog():
    username = get_jwt_identity()
    data = request.json
    print("Received blog data:", data)
    cur = conn.cursor()
    cur.execute("SELECT id FROM users WHERE username=%s", (username,))
    user = cur.fetchone()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    try:
        cur.execute(
            "INSERT INTO blogs (title, content, imageurl, user_id) VALUES (%s, %s, %s, %s)",
            (data['title'], data['content'], data.get('imageurl'), user[0])
        )
        conn.commit()
    except Exception as e:
        print("DB Insert Error:", e)
        return jsonify({'error': 'Database insert failed'}), 500
    return jsonify({'success': True})

@app.route('/api/blogs/<int:blog_id>', methods=['GET'])
def get_blog_by_id(blog_id):
    cur = conn.cursor()
    cur.execute("SELECT id, title, content, imageurl, user_id FROM blogs WHERE id = %s", (blog_id,))
    row = cur.fetchone()
    if not row:
        return jsonify({'error': 'Blog not found'}), 404
    blog = {
        'id': str(row[0]),
        'title': row[1],
        'content': row[2],
        'imageurl': row[3],
        'user_id': row[4]
    }
    return jsonify(blog)

if __name__ == '__main__':
    app.run(port=4000, debug=True)
