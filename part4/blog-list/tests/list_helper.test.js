import { describe, test } from "node:test";
import assert from "node:assert";
import { dummy, totalLikes } from "../utils/list_helper.js";

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
