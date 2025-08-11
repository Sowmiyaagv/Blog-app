import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import BlogModal from '../components/BlogModal';
import { getBlogs, saveBlog } from '../utils/storage';
import axios from "axios";

const DEFAULT_BLOGS = [
	{
		id: '1',
		title: 'Travel Tips',
		content:
			'Explore the world with travel tips. Learn to pack smart, book cheap flights, travel safely, and enjoy new cultures. These tips are ideal for solo travelers and families alike. Try out apps, local food, and offbeat places.',
		image: 'world.jpg',
		createdAt: new Date().toISOString(),
	},
	{
		id: '2',
		title: 'Healthy Recipes',
		content:
			'Discover healthy and tasty recipes. Enjoy salads, smoothie bowls, grilled veggies, and nutrient-packed meals. Perfect for busy people and food lovers. All under 30 minutes. Stay fit, feel full, and avoid junk.',
		image: 'food.jpg',
		createdAt: new Date().toISOString(),
	},
	{
		id: '3',
		title: 'Tech Trends',
		content:
			'Catch up on tech. Learn about AI, Web3, cloud computing, automation, and next-gen devices. Tech is evolving fast—be part of the future. Startups and innovations are changing our lives rapidly.',
		image: 'trends.jpg',
		createdAt: new Date().toISOString(),
	},
];

const BLOGS_PER_PAGE = 5;

export default function Home() {
	const [userBlogs, setUserBlogs] = useState([]);
	const [createOpen, setCreateOpen] = useState(false);
	const [page, setPage] = useState(1);
	const observerRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const stored = getBlogs();
		setUserBlogs(stored);
	}, []);

	const allBlogs = [...DEFAULT_BLOGS, ...userBlogs];
	const totalPages = Math.ceil(allBlogs.length / BLOGS_PER_PAGE);
	const startIdx = (page - 1) * BLOGS_PER_PAGE;
	const currentBlogs = allBlogs.slice(startIdx, startIdx + BLOGS_PER_PAGE);

	const loadMoreBlogs = useCallback(() => {
		setPage((prev) => Math.min(prev + 1, totalPages));
	}, [totalPages]);

	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect();

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && page < totalPages) {
					loadMoreBlogs();
				}
			},
			{ threshold: 1 }
		);

		const target = document.querySelector('#scroll-sentinel');
		if (target) observer.observe(target);
		observerRef.current = observer;

		return () => observer.disconnect();
	}, [page, totalPages, loadMoreBlogs]);

	const handleCreate = async (newBlogData) => {
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				"http://localhost:4000/api/blogs",
				{
					title: newBlogData.title,
					content: newBlogData.content,
					imageurl: newBlogData.image, // or imageurl if that's the field
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// Refresh blogs from backend
			const res = await axios.get("http://localhost:4000/api/blogs");
			setUserBlogs(res.data);
			setCreateOpen(false);
		} catch (err) {
			alert("Failed to create blog: " + (err.response?.data?.error || err.message));
		}
	};

	useEffect(() => {
		fetch('http://localhost:4000/api/blogs')
			.then((res) => res.json())
			.then((data) => {
				console.log('Fetched blogs:', data); // Add this line
				setUserBlogs(data);
			});
	}, []);

	const isLoggedIn = !!localStorage.getItem('token');
	const username = localStorage.getItem("username");

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		window.location.reload();
	};

	return (
		<div
			className="min-h-screen bg-[#fdf6f0] text-gray-800 bg-cover bg-center"
			style={{ backgroundImage: "url('/home.jpg')" }}
		>
			<div className="max-w-5xl mx-auto p-6">
				{/* Top bar */}
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold">Latest Blogs</h1>
					{isLoggedIn ? (
						<div className="flex items-center gap-4">
							<span className="text-[#5e4444] font-semibold">
							  {username ? `Logged in as ${username}` : ""}
							</span>
							<button
								onClick={handleLogout}
								className="bg-[#a97c50] text-white px-4 py-2 rounded"
							>
								Logout
							</button>
						</div>
					) : null}
				</div>

				{/* Create Blog Button */}
				<div className="flex justify-end mb-6">
					{isLoggedIn ? (
						<button
							className="bg-[#c89f9c] hover:bg-[#b38c8b] text-white px-6 py-2 rounded-lg font-semibold shadow transition"
							onClick={() => setCreateOpen(true)}
						>
							Create Blog
						</button>
					) : (
						<button
							className="bg-[#c89f9c] hover:bg-[#b38c8b] text-white px-6 py-2 rounded-lg font-semibold shadow transition"
							onClick={() => navigate('/')}
						>
							Log in to create blog
						</button>
					)}
				</div>

				<BlogModal open={createOpen} setOpen={setCreateOpen} onCreate={handleCreate} />

				{/* Blog Cards */}
				<div className="grid gap-8 md:grid-cols-3">
					{currentBlogs.map((blog) => (
						<div key={blog.id} onClick={() => navigate(`/blogs/${blog.id}`)}>
							<BlogCard blog={blog} />
						</div>
					))}
				</div>

				{/* Pagination Controls */}
				<div className="flex justify-center items-center gap-4 mt-8">
					<button
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
						className="px-3 py-1 rounded bg-[#e2c8b0] text-[#5e4444] disabled:opacity-50"
					>
						Previous
					</button>
					<span>
						Page {page} of {totalPages}
					</span>
					<button
						onClick={() => setPage(page + 1)}
						disabled={page === totalPages}
						className="px-3 py-1 rounded bg-[#e2c8b0] text-[#5e4444] disabled:opacity-50"
					>
						Next
					</button>
				</div>

				<div id="scroll-sentinel" className="h-10 mt-10" />

				
			</div>
		</div>
	);
}
