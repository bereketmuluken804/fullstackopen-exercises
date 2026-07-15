import mongoose from "mongoose";
import config from "../utils/config.js";

mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URL, {family: 4});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true 
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0     
  }
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
