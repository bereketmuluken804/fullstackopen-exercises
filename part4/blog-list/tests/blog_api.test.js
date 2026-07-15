import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import Blog from '../model/blog.js'

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json and correct amount is returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier property is named id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    
    const blogs = response.body
    assert.ok(blogs[0].id)
    assert.strictEqual(blogs[0]._id, undefined)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert.ok(titles.includes('Canonical string reduction'))
  })

  test('likes property defaults to 0 if missing from the request', async () => {
    const blogWithoutLikes = {
      title: 'Type wars',
      author: 'Eric Elliott',
      url: 'https://medium.com/javascript-scene/tdd-changed-my-life-5400d47d8b30'
    }

    const response = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title is not added and returns 400 Bad Request', async () => {
    const blogWithoutTitle = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/CleanerCode.html',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('blog without url is not added and returns 400 Bad Request', async () => {
    const blogWithoutUrl = {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})