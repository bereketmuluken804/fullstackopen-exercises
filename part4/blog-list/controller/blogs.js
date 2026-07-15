import express from 'express'
import Blog from '../model/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).json({error: "Blog Not found"})
  }
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

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();

})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blogToUpdate = {
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    blogToUpdate, 
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.patch("/:id", async (req, res) => {
  const update = req.body;
  const blog = await Blog.findById(req.params.id);

  Object.keys(update).forEach(key=>{
    if(key !== "id" && key !== "_id"){
      blog[key] = update[key];
    }
  })

  const savedBlog = await blog.save();
  res.json(savedBlog);
  
})

export default blogsRouter