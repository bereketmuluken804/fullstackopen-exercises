import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const getBlog = (id) => {
  const response = axios.get(`${baseUrl}/${id}`);
  return response.then(response => response.data)
}
const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {headers: {Authorization: token}});
  return response.data;
}

const updateLike =  async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data;
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {headers: {Authorization: token}})
  return 
}
export default { getAll, createBlog, setToken, updateLike, deleteBlog, getBlog}