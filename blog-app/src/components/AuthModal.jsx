import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem('username');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:4000/api/login", { username, password });
        login(res.data.token);
        localStorage.setItem("username", username); // <-- Add this line
        setSuccess("Login successful!");
        setTimeout(() => {
          setSuccess("");
          onClose();
          navigate("/blogs");
        }, 1200);
      } else {
        const res = await axios.post("http://localhost:4000/api/register", { username, password });
        
        const loginRes = await axios.post("http://localhost:4000/api/login", { username, password });
        login(loginRes.data.token);
        setSuccess("Registration successful! Logging you in...");
        setTimeout(() => {
          setSuccess("");
          onClose();
          navigate("/blogs");
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#e2c8b0] via-[#a97c50] to-[#7c5a3e] p-8 rounded-lg shadow-lg w-80 border border-[#a97c50]">
        <h2 className="text-xl font-bold mb-4 text-[#5e4444]">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border border-[#a97c50] bg-[#fff9f6] p-2 rounded text-[#5e4444] placeholder-[#a08d86]"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="border border-[#a97c50] bg-[#fff9f6] p-2 rounded text-[#5e4444] placeholder-[#a08d86]"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-700 font-semibold">{success}</div>}
          <button className="bg-[#a97c50] hover:bg-[#7c5a3e] text-white py-2 rounded font-semibold transition" type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="flex gap-2 mt-3">
          <button
            className={`px-3 py-1 rounded transition font-semibold
              ${isLogin
                ? "bg-[#a97c50] text-[#fff9f6] hover:bg-[#7c5a3e]"
                : "bg-[#7c5a3e] text-[#fff9f6] hover:bg-[#a97c50]"}
            `}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "No account? Register" : "Already have an account? Login"}
          </button>
          <button
  className="text-[#5e4444] ml-auto underline hover:text-[#5c3a23] transition"
  onClick={onClose}
>
  Close
</button>
        </div>
      </div>
    </div>
  );
}