import { useEffect, useState } from "react";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import serverTools from "./service/persons";
import Notification from "./components/Notification";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [msg, setMsg] = useState(null);
	useEffect(() => {
		serverTools.getPersons().then((persons) => setPersons(persons));
	}, []);

	const handleNameChange = (e) => {
		const val = e.target.value;
		if (val === "" || /[a-zA-Z]/.test(val)) {
			setNewName(val);
		}
	};

	const handleNumChange = (e) => {
		const val = e.target.value;
		if (/^[0-9\-]*$/.test(val)) setNewNum(val);
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
		const dublicatePerson = persons.find(
			(person) => person.name === trimedName,
		);

		if (dublicatePerson && dublicatePerson.number !== trimedNum) {
			const overideNum = window.confirm(
				`'${trimedName}'  exists in the phonebook with a different number.\nDo you want to update the number?`,
			);
			if (overideNum) {
				const updatedPerson = { ...dublicatePerson, number: trimedNum };
				serverTools.updateNumber(updatedPerson).then((updated) => {
					setPersons((prev) =>
						prev.map((person) =>
							person.id === dublicatePerson.id ? updated : person,
						),
					);
					setNewName("");
					setNewNum("");
				});
			}
			return;
		} else if(dublicatePerson){
			alert(`'${trimedName}' already exists in the phonebook`);
			return;
		}
		const numDup = persons.some((person) => person.number === trimedNum);
		if (numDup) {
			alert(`inserted number already exists`);
			return;
		}

		const newPerson = {
			name: trimedName,
			number: trimedNum,
		};

		serverTools.addPerson(newPerson).then((addPerson) => {
			setPersons(persons.concat(addPerson));
			setNewName("");
			setNewNum("");
			setMsg(`Added ${addPerson.name}`)
			setTimeout(()=>{
				setMsg(null)
			}, 5000)
		});
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
	const handleDelete = (toDelete) => {
		if (window.confirm(`Delete ${toDelete.name}`)) {
			serverTools.deletePerson(toDelete.id).then((deleted) => {
				console.log(deleted);
				setPersons((prev) =>
					prev.filter((person) => person.id !== deleted.id),
				);
			});
		}
	};
	return (
		<>
			<h1>Phonebook</h1>
			<Notification msg={msg}/>
			<Filter onChange={handleFilter} filtered={filtered} />

			<Form
				newName={newName}
				newNum={newNum}
				handleSubmit={handleSubmit}
				handleNameChange={handleNameChange}
				handleNumChange={handleNumChange}
			/>

			<Persons persons={persons} handleDelete={handleDelete} />
		</>
	);
};
export default App;
