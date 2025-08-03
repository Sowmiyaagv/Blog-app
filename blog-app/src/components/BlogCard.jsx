import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlogCard({ blog }) {
  const preview =
    blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content;

  return (
    <Card
      className="bg-[#fff9f6] border border-[#e2d5cf] shadow-sm hover:shadow-md transition-all duration-300 rounded-lg cursor-pointer 
      opacity-0 animate-fade-in"
    >
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-md"
          loading="lazy"
        />
      )}
      <CardHeader>
        <CardTitle className="text-lg text-[#5e4444]">{blog.title}</CardTitle>
        <CardDescription className="text-[#a08d86] text-xs">
          {new Date(blog.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[#6b4e4e] text-sm">{preview}</p>
      </CardContent>
    </Card>
  );
}
