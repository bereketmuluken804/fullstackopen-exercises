import mongoose from "mongoose";
import config from "../utils/config.js";

mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URL, {family: 4});

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set("toJSON", {
  transform: (doc, returnedObj)=>{
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})
const Blog = mongoose.model('Blog', blogSchema)

export default Blog;
