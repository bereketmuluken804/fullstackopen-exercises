import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import auth from "./services/auth";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import BlogDetails from "./components/BlogDetail";
const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [err, setErr] = useState(null);
	const [scc, setScc] = useState(null);
	const [user, setUser] = useState(null);
	const toggleRef = useRef();
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
				setMsg(setErr, "Couldn't load blogs");
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
			navigate("/");
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
	async function onLike(id) {
		try {
			const theBlog = blogs.find((blog) => blog.id === id);
			if (!theBlog) {
				setMsg(setErr, "Couldn't find the blog, please try again");
			}
			const updatedBlog = await blogService.updateLike({
				...theBlog,
				likes: theBlog.likes + 1,
			});
			setBlogs(
				blogs.map((blog) => (blog.id === id ? updatedBlog : blog)),
			);
			return updatedBlog;
		} catch (error) {}
	}

	async function onDelete(id) {
		try {
			const blog = blogs.find((blog) => blog.id === id);
			if (!window.confirm(`Delete ${blog.title}?`)) return;
			await blogService.deleteBlog(id);
			setBlogs(blogs.filter((blog) => blog.id !== id));
			setMsg(setScc, `Deleted ${blog.title}`);
			navigate("/");
		} catch (error) {
			const msg = error.response
				? error.response.data.error
				: error.message;
			setMsg(setErr, msg);
		}
	}
	const loginForm = () => {
		if (user) {
			return <Navigate to="/" />;
		}

		return (
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
	};

	const blogsView = () => (
		<div>
			<h2>blogs</h2>
			<h3>welcome, {user?.name}</h3>
			{err && <p className="err-msg">{err}</p>}
			{scc && <p className="success">{scc}</p>}
			{[...blogs] // sort mutates an array so work on a copy to avoid side effects
				.sort((blog1, blog2) => blog2.likes - blog1.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						onLike={() => onLike(blog.id)}
						onDelete={() => onDelete(blog.id)}
						user={user}
					/>
				))}
		</div>
	);

	return (
		<>
			<nav>
				<Link to="/">Home</Link>

				{!user ? (
					<Link to="/login">Login</Link>
				) : (
					<>
					<Link to='/blogs/new'>New Note</Link>
						<button
							onClick={() => {
								setUser(null);
								localStorage.removeItem("user");
								navigate("/");
							}}
						>
							Logout
						</button>
					</>
				)}
			</nav>
			<Routes>
				<Route path="/" element={blogsView()} />
				<Route path="/login" element={loginForm()} />
				<Route
					path="/blogs/:id"
					element={
						<BlogDetails
							onLike={onLike}
							onDelete={onDelete}
							user={user}
						/>
					}
				/>
				<Route path="/blogs/new" element={<NewBlogForm
					setMsg={setMsg}
					setBlogs={setBlogs}
					setErr={setErr}
					setScc={setScc}
					toggleRef={toggleRef}
				/>} />
			</Routes>
		</>
	);
};

export default App;
