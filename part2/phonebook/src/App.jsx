import { useEffect, useState } from "react";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import serverTools from "./service/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		serverTools.getPersons().then((persons) => setPersons(persons));
	}, []);

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
		};
		
		serverTools.addPerson(newPerson).then(addPerson=>{
			setPersons(persons.concat(addPerson));
			setNewName("");
			setNewNum("");
		})
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
