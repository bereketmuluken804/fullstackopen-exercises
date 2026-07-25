import express from "express";
import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate("user", {
		username: 1,
		name: 1,
	});
	if (!blog) {
		return response.status(404).json({ error: "Blog Not found" });
	}
	response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
	try {
		const { title, author, url, likes } = request.body;
		const user = request.user;

		if (!title || !url) {
			return response.status(400).json({error: "title or url missing"});
		}

		const blog = new Blog({
			title,
			author,
			url,
			likes: likes ?? 0,
			user: user.id,
		});

		const savedBlog = await blog.save();
		user.blogs = (user.blogs || []).concat(savedBlog.id);
		await user.save();
		response.status(201).json(savedBlog);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete("/:id", async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id);
		if(!blog){
			return res.status(404).json({error: "blog not found"})
		}
		if(blog.user.toString() === req.user.id){
			console.log(blog.user.toString(), req.user.id);
			await Blog.findByIdAndDelete(req.params.id);
			res.status(204).end();
		}
		else {
			return res.status(403).json({error: "permission denied: only the author of the blog can delete it"})
		}
	} catch (error) {
		next(error)
	}
});

blogsRouter.put("/:id", async (request, response) => {
	const { title, author, url, likes } = request.body;

	const blogToUpdate = {
		title,
		author,
		url,
		likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		blogToUpdate,
		{ new: true, runValidators: true, context: "query" },
	);

	if (updatedBlog) {
		response.json(updatedBlog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.patch("/:id", async (req, res) => {
	const update = req.body;
	const blog = await Blog.findById(req.params.id);

	Object.keys(update).forEach((key) => {
		if (key !== "id" && key !== "_id") {
			blog[key] = update[key];
		}
	});

	const savedBlog = await blog.save();
	res.json(savedBlog);
});

export default blogsRouter;
