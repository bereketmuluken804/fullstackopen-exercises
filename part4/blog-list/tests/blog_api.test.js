import { test, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const api = supertest(app);
let token = null;

const initialBlogs = [
	{
		title: "The Hidden Cost of Micro-Optimization in JavaScript",
		author: "Elena Rostova",
		url: "https://rostovatech.blog/hidden-costs-js-optimization",
		likes: 18,
	},
	{
		title: "Why We Abandoned Single Page Applications in 2026",
		author: "Marcus Vance",
		url: "https://vance-codes.dev/abandoning-spas",
		likes: 32,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	// root user
	const newUser = {
		username: "root",
		name: "Superuser",
		password: "secretpassword",
	};

	await api.post("/api/users").send(newUser);
	const user = await User.findOne({username: "root"})
	// Log in and store token
	const loginResponse = await api.post("/api/login").send({
		username: "root",
		password: "secretpassword",
	});

	token = loginResponse.body.token;

	// initial blogs linked to root user
	const blogObjs = initialBlogs.map(
		(blog) => new Blog({ ...blog, user: user._id }),
	);
	const promiseArray = blogObjs.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
	test("blogs are returned as json and correct amount is returned", async () => {
		const response = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(response.body.length, initialBlogs.length);
	});

	test("unique identifier property is named id instead of _id", async () => {
		const response = await api.get("/api/blogs");
		const blogs = response.body;

		assert.ok(blogs[0].id);
		assert.strictEqual(blogs[0]._id, undefined);
	});
});

describe("addition of a new blog", () => {
	test("valid data and token", async () => {
		const newBlog = {
			title: "New Tech",
			author: "James",
			url: "https://somewhere.com",
			likes: 4,
		};

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await Blog.find({});
		assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);
	});

	test("fails with status code 401 unauthorized if token not provided", async () => {
		const newBlog = {
			title: "Unauthorized Blog Post",
			author: "Anonymous",
			url: "http://example.com/unauthorized",
			likes: 0,
		};

		const result = await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(401)
			.expect("Content-Type", /application\/json/);

		assert.match(
			result.body.error,
			/token missing|token invalid|invalid token/i,
		);

		const blogsAtEnd = await Blog.find({});
		assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
	});

	test("likes property defaults to 0 if missing from the request", async () => {
		const blogWithoutLikes = {
			title: "Type wars",
			author: "Eric Elliott",
			url: "https://medium.com/javascript-scene/tdd-changed-my-life-5400d47d8b30",
		};

		const response = await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(blogWithoutLikes)
			.expect(201);

		assert.strictEqual(response.body.likes, 0);
	});

	test("blog without title is not added and returns 400 Bad Request", async () => {
		const blogWithoutTitle = {
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/CleanerCode.html",
			likes: 10,
		};

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`) // Added token
			.send(blogWithoutTitle)
			.expect(400);

		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, initialBlogs.length);
	});

	test("blog without url is not added and returns 400 Bad Request", async () => {
		const blogWithoutUrl = {
			title: "Clean Code",
			author: "Robert C. Martin",
			likes: 10,
		};

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`) // Added token
			.send(blogWithoutUrl)
			.expect(400);

		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, initialBlogs.length);
	});
});

describe("deletion of a blog", () => {
	test("succeeds with status code 204 if id is valid and authorized", async () => {
		const responseAtStart = await api.get("/api/blogs");
		const blogToDelete = responseAtStart.body[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set("Authorization", `Bearer ${token}`) // Added token
			.expect(204);

		const responseAtEnd = await api.get("/api/blogs");
		assert.strictEqual(
			responseAtEnd.body.length,
			responseAtStart.body.length - 1,
		);

		const titles = responseAtEnd.body.map((r) => r.title);
		assert.ok(!titles.includes(blogToDelete.title));
	});
});

describe("updating a blog", () => {
	test("succeeds in updating the number of likes", async () => {
		const responseAtStart = await api.get("/api/blogs");
		const blogToUpdate = responseAtStart.body[0];

		const updatedBlogData = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes + 10,
		};

		const response = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlogData)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);
	});
});

after(async () => {
	await mongoose.connection.close();
});
