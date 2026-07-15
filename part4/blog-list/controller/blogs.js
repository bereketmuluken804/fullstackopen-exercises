import express from 'express'
import Blog from '../model/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes 
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

export default blogsRouter