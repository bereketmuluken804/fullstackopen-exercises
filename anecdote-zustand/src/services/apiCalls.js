const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if(!response.ok){
    throw new Error("Failed to fetch")
  }
  const data = await response.json();
  return data;
}
const create = async (content) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({content, votes: 0})
  })

  if(!response.ok){
    throw new Error("Failed to create")
  }
  const data = await response.json()
  return data
}

const update = async (id, ance) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUt",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(ance)
  })

  if(!response.ok){
    throw new Error("Failed to update")
  }
  const data = await response.json()
  return data
}
const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {"Content-Type" : "application/json"},
  })
  if(!response.ok){
    throw new Error("Failed to delete")
  }

}
export default { getAll, create, update, remove}