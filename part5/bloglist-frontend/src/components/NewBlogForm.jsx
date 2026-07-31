import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
function NewBlogForm({setMsg, setBlogs, setScc, setErr}){
	const [newBlog, setNewBlog] = useState({
			title: "",
			author: "",
			url: "",
		});
	const navigate = useNavigate();
	
		function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		setNewBlog({ ...newBlog, [name]: value });
	}
	
	async function handleCreate(e) {
		try {
			e.preventDefault();
			const { title, author, url } = newBlog;
			const savedBlog = await blogService.createBlog(newBlog);
			setMsg(setScc, "Blog Created successfully");
			setBlogs((prev) => prev.concat(savedBlog));
			setNewBlog({
				title: "",
				author: "",
				url: "",
			});
			navigate('/')
		} catch (error) {
			let msg;
			if (error.response) msg = error.response.data.error;
			else {
				msg = error.message;
			}
			setMsg(setErr, msg);
		}
	}
  return <form onSubmit={handleCreate}>
				<label htmlFor="">
					Title:
					<input
						type="text"
						onChange={handleChange}
						value={newBlog.title}
						name="title"
					/>
				</label>
				<br />
				<label htmlFor="">
					Author:
					<input
						type="text"
						onChange={handleChange}
						value={newBlog.author}
						name="author"
					/>
				</label>
				<br />
				<label htmlFor="">
					URL:
					<input
						type="text"
						onChange={handleChange}
						value={newBlog.url}
						name="url"
					/>
				</label>
				<br />
				<button type="submit">Create</button>
			</form>
}

export default NewBlogForm;