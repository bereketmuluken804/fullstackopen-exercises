import axios from "axios";

const baseUrl = "/api/persons";
const getPersons = () => {
    return axios.get(baseUrl).then(
        response=>response.data
    )
}

const addPerson = async (newPerson) => {
    const response = await axios.post(baseUrl, newPerson);
    return response.data;
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response=>response.data)
}

const updateNumber = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(response=>response.data)
}
export default { getPersons, addPerson, deletePerson, updateNumber}