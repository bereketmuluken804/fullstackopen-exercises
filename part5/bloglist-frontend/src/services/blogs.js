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
const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {headers: {Authorization: token}});
  return response.data;
}
export default { getAll, createBlog, setToken}