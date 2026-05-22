import axios from "axios";

const baseUrl = "http://localhost:3001/persons";
const getPersons = () => {
    return axios.get(baseUrl).then(
        response=>response.data
    )
}

const addPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response=>response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response=>response.data)
}

const updateNumber = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(response=>response.data)
}
export default { getPersons, addPerson, deletePerson, updateNumber}