import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Blog = ({ blog, onLike, onDelete, user }) => {
  const navigate = useNavigate();
  return (
    <div className="blog" style={{ border: "1px solid black", padding: "5px" }}>
      <div className="blog-title-author">
        {blog.title} {blog.author}
        {blog.user?.username === user?.username && (
          <button onClick={onDelete}>Delete</button>
        )}
      </div>
      <button onClick={() => navigate(`/blogs/${blog.id}`)}>View</button>
    </div>
  );
};

export default Blog;