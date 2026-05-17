const Persons = ({ persons }) => {
	return (
		<>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<li key={person.id}>
					{person.name}: {person.number}
				</li>
			))}
		</>
	);
};
export default Persons;
