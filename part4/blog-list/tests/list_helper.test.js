import { describe, test } from "node:test";
import assert from "node:assert";
import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from "../utils/list_helper.js";

describe("Dummy test", () => {
	test("dummy returns 1", () => {
		const blogs = [];

		const result = dummy(blogs);
		assert.strictEqual(result, 1);
	});
});

describe("Total likes test", () => {
	test("returns zero for empty list", () => {
		const blog = [];
		const result = totalLikes(blog);
		assert.strictEqual(result, 0);
	});

	test("one blog equal to that blogs like", () => {
		const blog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 5,
				__v: 0,
			},
		];
		assert.strictEqual(totalLikes(blog), blog[0].likes);
	});

	test("calculated right", () => {
		const blog = [
			{
				title: "blog1",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog1",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a560ae9b732fa3d562d8155",
			},
		];
		const result = totalLikes(blog);
		assert.strictEqual(result, 64);
	});
});

describe("favorite blog", () => {
	test("returns message for empty list", () => {
		const blog = [];
		const fav = favoriteBlog(blog);
		assert.equal(fav, "No favorite found");
	});

	test("one blog equal to that blog", () => {
		const blog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 5,
				__v: 0,
			},
		];
		const fav = favoriteBlog(blog);
		assert.deepStrictEqual(fav, blog[0]);
	});

	test("calculated right", () => {
		const blog = [
			{
				title: "blog1",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog1",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 21,
				id: "6a560ae9b732fa3d562d8155",
			},
		];
		const fav = favoriteBlog(blog);
		assert.deepStrictEqual(fav, blog[0]);
	});
});

describe("Most blog author", () => {
	test("returns message for empty list", () => {
		const blog = [];
		const fav = mostBlogs(blog);
		assert.equal(fav, "No blog found");
	});

	test("one blog equal to that blog's author", () => {
		const blog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 5,
				__v: 0,
			},
		];
		const most = mostBlogs(blog);
		assert.deepStrictEqual(most, {
			author: "Edsger W. Dijkstra",
			blogs: 1,
		});
	});

	test("calculated right", () => {
		const blog = [
			{
				title: "blog1",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog2",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 21,
				id: "6a560ae9b732fa3d562d8155",
			},
			{
				title: "blog3",
				author: "beka",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog4",
				author: "beka",
				url: "https/sdfs.com",
				likes: 21,
				id: "6a560ae9b732fa3d562d8155",
			},
			{
				title: "blog5",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog6",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 21,
				id: "6a560ae9b732fa3d562d8155",
			},
		];
		const most = mostBlogs(blog);
		assert.deepStrictEqual(most, {
			author: "bekasnow",
			blogs: 4,
		});
	});
});

describe("Most liked author", () => {
	test("returns message for empty list", () => {
		const blog = [];
		const fav = mostLikes(blog);
		assert.equal(fav, "No blog found");
	});

	test("one blog equal to that blog's like", () => {
		const blog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
				likes: 5,
				__v: 0,
			},
		];
		const most = mostLikes(blog);
		assert.deepStrictEqual(most, {
			author: "Edsger W. Dijkstra",
			likes: blog[0].likes,
		});
	});

	test("calculated right", () => {
		const blog = [
			{
				title: "blog1",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog2",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 21,
				id: "6a560ae9b732fa3d562d8155",
			},
			{
				title: "blog3",
				author: "beka",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog4",
				author: "beka",
				url: "https/sdfs.com",
				likes: 21,
				id: "6a560ae9b732fa3d562d8155",
			},
			{
				title: "blog5",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 32,
				id: "6a55ffbf91b962ee76122c8c",
			},
			{
				title: "blog6",
				author: "bekasnow",
				url: "https/sdfs.com",
				likes: 21,
				id: "6a560ae9b732fa3d562d8155",
			},
		];
		const most = mostLikes(blog);
		assert.deepStrictEqual(most, {
			author: "bekasnow",
			likes: 106,
		});
	});
});
