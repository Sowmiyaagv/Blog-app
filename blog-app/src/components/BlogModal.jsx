import { useState } from 'react';

export default function BlogModal({ open, setOpen, onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }
    onCreate({ title, content, image });
    setTitle('');
    setContent('');
    setImage('');
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-[#e2c8b0]/80 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#e2c8b0] via-[#a97c50] to-[#7c5a3e] rounded-lg max-w-lg w-full p-6 shadow-lg text-[#5e4444]"
      >
        <h2 className="text-2xl mb-4 font-bold">Create New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#c89f9c] hover:bg-[#b38c8b] text-white font-semibold transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
