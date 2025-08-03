export default function BlogDetailModal({ open, setOpen, blog, onDelete, isUserCreated }) {
  if (!open) return null;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this blog?')) {
      onDelete(blog.id);
    }
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-xl w-full p-6 relative shadow-lg"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          &times;
        </button>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded mb-4"
            loading="lazy"
          />
        )}

        <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{blog.content}</p>
        <p className="text-xs text-gray-400 mt-4">{new Date(blog.createdAt).toLocaleString()}</p>

        {isUserCreated && (
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Blog
          </button>
        )}
      </div>
    </div>
  );
}
