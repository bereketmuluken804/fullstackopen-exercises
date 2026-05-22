const Persons = ({ persons, handleDelete}) => {
	return (
		<>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<li key={person.id}>
					{person.name}: {person.number}
				<button onClick={()=> handleDelete(person)}>Delete</button>
				</li>
				
			))}
		</>
	);
};
export default Persons;
