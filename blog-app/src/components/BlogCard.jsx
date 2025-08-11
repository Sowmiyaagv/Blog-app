import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  if (!blog) return null; 

  const preview =
    blog.content?.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content || '';

  return (
    <Card
      className="bg-[#e2c8b0] border border-[#a97c50] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer"
      onClick={() => navigate(`/blogs/${blog.id}`)}
    >
      {(blog.imageurl || blog.image) && (
        <img
          src={blog.imageurl || blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-md"
          loading="lazy"
        />
      )}
      <CardHeader>
        <CardTitle className="text-lg text-[#5e4444]">{blog.title || "Untitled"}</CardTitle>
        <CardDescription className="text-[#a08d86] text-xs">
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleString()
            : blog.author
              ? `By ${blog.author}`
              : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[#7c5a3e] text-sm">{preview}</p>
      </CardContent>
    </Card>
  );
}

export function BlogList({ blogs }) {
  return (
    <div>
      {Array.isArray(blogs) && blogs.length > 0 ? (
        blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      ) : (
        <div>No blogs found.</div>
      )}
    </div>
  );
}
