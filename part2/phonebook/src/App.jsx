import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: "Beki",
			number: "32 3223 323",
			id: 1,
		},
	]);
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");

	const handleNameChange = (e) => {
		const val = e.target.value;
		if (/[a-zA-Z]/.test(val)) {
			setNewName(val);
		}
	};

	const numChange = (e) => {
		const val = e.target.value;
		if (/[0-9]/.test(val)) setNewNum(val);
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
	return (
		<>
			<h1>Phonebook</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name: </label>
				<input
					value={newName}
					onChange={handleNameChange}
					type="text"
					name="person-name"
					id="name"
				/>

				<div>
					<label htmlFor="number">Number: </label>
					<input
						value={newNum}
						onChange={numChange}
						type="text"
						name="number"
						id="number"
					/>
				</div>
				<div>
					<button type="submit">Add</button>
				</div>
			</form>

			<h2>Numbers</h2>
			{persons.map((person) => (
				<li key={person.id}>
					{person.name}: {person.number}
				</li>
			))}
		</>
	);
};
export default App;
