import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useEffect, useState } from "react";

function BlogDetails({user, onLike, onDelete}) {
  const [blog, setBlog] = useState(null)
	const id = useParams().id;
  useEffect(() => {
    blogService.getBlog(id).then(blog=>
      setBlog(blog)
    )
  }, [])
  if(blog && id){
    return <div className="blog" style={{ border: "1px solid black", padding: "5px" }}>
      <div className="blog-title-author">
        {blog.title} {blog.author}
        {blog.user?.username === user?.username && (
          <button onClick={()=> onDelete(blog.id)}>Delete</button>
        )}
      </div>
        <div className="blog-details">
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            likes {blog.likes}
            <button onClick={async ()=>{
              const updatedBlog = onLike(blog.id)
              updatedBlog.then(blog=>
                setBlog(blog)
              )
              }}>like</button>
          </p>
        </div>
      
    </div>
  }
}


export default BlogDetails;