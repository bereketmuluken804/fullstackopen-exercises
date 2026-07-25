import { useState } from "react";
const Blog = ({ blog, onLike, onDelete, user }) => {
	const [view, setView] = useState(false);
	return (
		<div style={{ border: "1px solid black", padding: "5px" }}>
			<h4>
				{blog.title} {blog.user.username === user.username && <button onClick={onDelete}>Delete</button>}
			</h4>
			{view && (
				<div>
					<button onClick={() => setView(false)}>hide</button>
					<p>{blog.url}</p>
					<p>
						likes {blog.likes}
						<button onClick={onLike}>like</button>
					</p>
				</div>
			)}
      {!view && <button onClick={()=>setView(true)}>View</button>
}
		</div>
	);
};

export default Blog;
