import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DEFAULT_BLOGS = [
  {
    id: '1',
    title: 'Travel Tips',
    content: 'Explore the world with travel tips. Learn to pack smart, book cheap flights, travel safely, and enjoy new cultures. These tips are ideal for solo travelers and families alike. Try out apps, local food, and offbeat places.',
    image: '/world.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Healthy Recipes',
    content: 'Discover healthy and tasty recipes. Enjoy salads, smoothie bowls, grilled veggies, and nutrient-packed meals. Perfect for busy people and food lovers. All under 30 minutes. Stay fit, feel full, and avoid junk.',
    image: '/food.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Tech Trends',
    content: 'Catch up on tech. Learn about AI, Web3, cloud computing, automation, and next-gen devices. Tech is evolving fast—be part of the future. Startups and innovations are changing our lives rapidly.',
    image: '/trends.jpg',
    createdAt: new Date().toISOString(),
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const defaultBlog = DEFAULT_BLOGS.find((b) => String(b.id) === String(id));
    if (defaultBlog) {
      setBlog(defaultBlog);
      return;
    }
    fetch(`http://localhost:4000/api/blogs/${id}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not found');
      })
      .then((data) => {
        setBlog({
          ...data,
          createdAt: data.createdAt || new Date().toISOString(),
          image: data.imageurl || data.image,
        });
      })
      .catch(() => {
        navigate('/blogs');
      });
  }, [id, navigate]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/blogs')}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Back to Blogs
      </button>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        Published: {new Date(blog.createdAt).toLocaleString()}
      </p>
      <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
        {blog.content}
      </p>
    </div>
  );
}
