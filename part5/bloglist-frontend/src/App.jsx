import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import auth from "./services/auth";
const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newBlog, setNewBlog] = useState({
		title: "",
		author: "",
		url: "",
	});
	const [err, setErr] = useState(null);
	const [scc, setScc] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userJson = localStorage.getItem("user");
		if (userJson) {
			const storedUser = JSON.parse(userJson);
			setUser(storedUser);
			blogService.setToken(storedUser.token);
		}
	}, []);
	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs))
			.catch((error) => {
        setMsg(setErr, "Couldn't load blogs")
			});
	}, []);

	async function handleLogin(e) {
		try {
			e.preventDefault();
			const user = await auth.login({ username, password });
			blogService.setToken(user.token);
			localStorage.setItem("user", JSON.stringify(user));
			setUser(user);
			setPassword("");
			setUsername("");
		} catch (error) {
			let msg;
			if (error.response) msg = error.response.data.error;
			else {
				msg = error.message;
			}
			setMsg(setErr, msg);
		}
	}

	function setMsg(setter, msg) {
		setter(msg);
		setTimeout(() => {
			setter(null);
		}, 5000);
	}

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
		} catch (error) {
			let msg;
			if (error.response) msg = error.response.data.error;
			else {
				msg = error.message;
			}
			setMsg(setErr, msg);
		}
	}

	const loginForm = () => (
		<div>
			<h1>Login to Blogs</h1>
			{err && <p className="err-msg">{err}</p>}
			<form onSubmit={handleLogin}>
				<label htmlFor="">
					username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label htmlFor="">
					password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit">Login</button>
			</form>
		</div>
	);

	const blogsView = () => (
		<div>
			<h2>blogs</h2>
			<h3>welcome, {user?.name}</h3>
			{err && <p className="err-msg">{err}</p>}
			{scc && <p className="success">{scc}</p>}
			<button
				onClick={() => {
					setUser(null);
					localStorage.removeItem("user");
				}}
			>
				Logout
			</button>
			<form onSubmit={handleCreate}>
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
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	return <div>{user ? blogsView() : loginForm()}</div>;
};

export default App;
