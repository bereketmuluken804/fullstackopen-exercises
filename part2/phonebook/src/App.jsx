import { useState } from "react";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Filter from "./components/Filter";


const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [filtered, setFiltered] = useState([]);
	const handleNameChange = (e) => {
		const val = e.target.value;
		if (/[a-zA-Z]/.test(val)) {
			setNewName(val);
		}
	};

	const handleNumChange = (e) => {
		const val = e.target.value;
		if (/[0-9\-]/.test(val)) setNewNum(val);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newName || !newNum) {
			const missed = !newName ? "Name" : "Number";
			alert(`Missing ${missed}`);
			return;
		}
		const trimedName = newName.trim();
		const trimedNum = newNum.trim();
		const dublicate = persons.some((person) => person.name === trimedName);

		if (dublicate) {
			alert(`The name '${trimedName}' already exists in the phonebook`);
			return;
		}
		const numDup = persons.some((person) => person.number === trimedNum);
		if (numDup) {
			alert(`The number '${trimedNum}' already exists in the phonebook`);
			return;
		}

		const newPerson = {
			name: trimedName,
			number: trimedNum,
			id: String(persons.length + 1),
		};
		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNum("");
	};

	const handleFilter = (e) => {
		const val = e.target.value.toLowerCase();
		const result = persons.filter((person) =>
			person.name.toLowerCase().includes(val),
		);
		if (val === "") {
			setFiltered([]);
		} else setFiltered(result);
	};

	return (
		<>
			<h1>Phonebook</h1>

			<Filter onChange={handleFilter} filtered={filtered} />

			<Form
				newName={newName}
				newNum={newNum}
				handleSubmit={handleSubmit}
				handleNameChange={handleNameChange}
				handleNumChange={handleNumChange}
			/>

			<Persons persons={persons} />
		</>
	);
};
export default App;
