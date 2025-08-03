import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBlogs } from '../utils/storage';

const DEFAULT_BLOGS = [
  {
    id: '1',
    title: 'Travel Tips',
    content: 'Explore the world with practical travel tips that help you save money and enjoy your trips more. Discover how to pack light, travel cheap, and find hidden gems.Traveling is one of the most enriching and transformative experiences life has to offer. It allows us to step away from daily routines and immerse ourselves in new cultures, languages, landscapes, and traditions. Whether you re wandering through ancient cities, hiking scenic trails, or relaxing on a quiet beach, every destination offers its own story and lessons.Beyond the excitement and adventure, travel teaches us patience, adaptability, and appreciation. It opens our eyes to the vast diversity of the world and reminds us that, despite our differences, people everywhere share common values—family, food, community, and connection. Meeting locals, trying unfamiliar dishes, and navigating new environments can be both challenging and rewarding.Whether youre traveling solo, with friends, or family, the memories created often last far beyond the trip itself. Travel not only refreshes the body and mind but also expands the heart. In every journey, theres an opportunity to grow, connect, and see the world—and yourself—from a new perspective.',
    image: '/world.jpg',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '2',
    title: 'Healthy Recipes',
    content:
      'Eating healthy does not mean sacrificing flavor or spending hours in the kitchen. With simple, nutritious ingredients and a bit of creativity, you can prepare delicious meals that energize your body and satisfy your taste buds. Healthy recipes focus on fresh vegetables, whole grains, lean proteins, and wholesome fats, helping you stay full and nourished throughout the day.\n\nWhether you are looking for quick breakfast ideas like smoothie bowls, vibrant salads for lunch, or easy dinners packed with flavor, healthy cooking can be fun and rewarding. Experiment with herbs, spices, and seasonal produce to keep your meals exciting. Batch cooking and meal prepping are great strategies to save time and avoid reaching for processed snacks.\n\nIncorporating healthy recipes into your routine supports your overall well-being—boosting your immune system, maintaining steady energy levels, and even improving mental clarity. Remember, balance is key: enjoying indulgent treats occasionally while mostly choosing nutrient-dense foods will keep you both satisfied and healthy.\n\nStart small by swapping out a few ingredients or trying new recipes each week. Over time, these habits become natural, transforming your eating habits and helping you feel your best every day.',
    image: '/food.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Tech Trends',
    content:
      'The world of technology is advancing at an unprecedented pace, transforming how we live, work, and communicate. From artificial intelligence and machine learning to blockchain and Web3, innovations are reshaping industries and creating new opportunities daily.\n\nCloud computing has revolutionized data storage and access, enabling businesses to be more agile and scalable. Automation and robotics are optimizing production processes and enhancing efficiency across sectors. Emerging devices such as smart wearables, augmented reality, and next-generation smartphones continue to push boundaries.\n\nStaying updated on tech trends is essential for professionals and enthusiasts alike. Startups are driving much of this innovation, creating solutions that address real-world problems and improve quality of life. As these technologies evolve, they raise important ethical and social questions that must be thoughtfully considered.\n\nEmbracing these changes requires continuous learning and adaptability. By understanding and leveraging the latest tech trends, individuals and organizations can remain competitive and contribute to shaping the future in meaningful ways.',
    image: '/trends.jpg',
    createdAt: new Date().toISOString(),
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const all = [...getBlogs(), ...DEFAULT_BLOGS];
    const found = all.find((b) => b.id === id);
    if (!found) {
      navigate('/');
    } else {
      setBlog(found);
    }
  }, [id, navigate]);

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
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
