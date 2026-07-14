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
export { dummy, totalLikes, favoriteBlog }