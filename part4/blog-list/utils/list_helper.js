import { log } from "node:console"

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
 const likes = blogs.reduce((sum, blog)=>{
  return sum + blog.likes
 }, 0) 
 return likes;
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return "No favorite found"
  }
  const fav = blogs.reduce((favorite, blog)=>{
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs[0])

  return fav;
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return "No blog found"
  }
  
  const result = blogs.reduce((acc, blog)=>{
    const author = blog.author;
    acc.counts[author] = (acc.counts[author] || 0) + 1

    if(acc.counts[author] > acc.top.blogs){
      acc.top.author = author
      acc.top.blogs = acc.counts[author]
    };
    return acc
  },{counts: {}, top: {author: "", blogs: 0}}).top;
  
  return result;
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return "No blog found"
  }

  const result = blogs.reduce((acc, blog)=>{
    const author = blog.author;
    acc.counts[author] = (acc.counts[author] || 0) + blog.likes;

    if(acc.counts[author] > acc.top.likes){
      acc.top.author = author;
      acc.top.likes = acc.counts[author];
    }

    return acc
  }, {counts: {}, top: {author: "", likes: 0}}).top

  return result;
}

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}