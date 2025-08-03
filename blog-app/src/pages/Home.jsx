import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import BlogModal from '../components/BlogModal';
import { getBlogs, saveBlog } from '../utils/storage';

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

const BLOG_BATCH_SIZE = 6;

export default function Home() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BLOG_BATCH_SIZE);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getBlogs();
    setUserBlogs(stored);
  }, []);

  const allBlogs = [...DEFAULT_BLOGS, ...userBlogs];
  const visibleBlogs = allBlogs.slice(0, visibleCount);

  const loadMoreBlogs = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BLOG_BATCH_SIZE, allBlogs.length));
  }, [allBlogs.length]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < allBlogs.length) {
          loadMoreBlogs();
        }
      },
      { threshold: 1 }
    );

    const target = document.querySelector('#scroll-sentinel');
    if (target) observer.observe(target);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [visibleCount, allBlogs.length, loadMoreBlogs]);

  const handleCreate = (newBlogData) => {
    const newBlog = saveBlog(newBlogData);
    setUserBlogs((prev) => [newBlog, ...prev]);
    setCreateOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0] text-gray-800">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setCreateOpen(true)}
            className="bg-[#c89f9c] hover:bg-[#b38c8b] text-white px-5 py-2 rounded-lg transition"
          >
            + Create Blog
          </button>
        </div>

        <BlogModal open={createOpen} setOpen={setCreateOpen} onCreate={handleCreate} />

        <h1 className="text-3xl font-bold mb-6 text-center text-[#5e4444]">Latest Blogs</h1>

        <div className="grid gap-8 md:grid-cols-3">
          {visibleBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        <div id="scroll-sentinel" className="h-10 mt-10" />
      </div>
    </div>
  );
}
