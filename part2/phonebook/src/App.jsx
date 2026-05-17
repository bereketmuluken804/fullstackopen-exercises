import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: "Beki",
			number: "",
			id: 1,
		},
	]);
	const [newName, setNewName] = useState("");

	const handleChange = (e) => {
		setNewName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
    const trimedName = newName.trim()
    const dublicate = persons.some((person)=> person.name === trimedName)
    if(dublicate){
      alert(`Name ${trimedName} already exists in the phonebook`)
      return
    }
    const newPerson = {
			name: trimedName,
			number: "",
			id: String(persons.length + 1),
		};
		setPersons(persons.concat(newPerson));
	};
	return (
		<>
			<h1>Phonebook</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name: </label>
				<input
					value={newName}
					onChange={handleChange}
					type="text"
					name="person-name"
					id="name"
				/>
				<div>
					<button type="submit">Add</button>
				</div>
			</form>

			<h2>Numbers</h2>
			{persons.map((person) => (
				<li key={person.id}>{person.name}</li>
			))}
		</>
	);
};
export default App;
