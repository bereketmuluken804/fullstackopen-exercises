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

const blogs = [
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

export { dummy, totalLikes, favoriteBlog, mostBlogs }