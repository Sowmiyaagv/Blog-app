// utils/storage.js
export function getBlogs() {
  const blogs = localStorage.getItem('blogs');
  return blogs ? JSON.parse(blogs) : [];
}

export function saveBlog(blog) {
  const blogs = getBlogs();
  const newBlog = {
    ...blog,
    id: Date.now().toString(), // unique string ID
    createdAt: new Date().toISOString(),
  };
  blogs.unshift(newBlog);
  localStorage.setItem('blogs', JSON.stringify(blogs));
  return newBlog;
}

export function deleteBlog(id) {
  const blogs = getBlogs();
  const filtered = blogs.filter(b => b.id !== id);
  localStorage.setItem('blogs', JSON.stringify(filtered));
  return filtered;
}
