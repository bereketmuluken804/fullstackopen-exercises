const Filter = ({ onChange, filtered }) => {
	return (
		<div>
			<label htmlFor="filter">Filter by name: </label>
			<input type="text" name="" id="" onChange={onChange} />
			{filtered.map((person) => (
				<li key={person.id}>
					{person.name}: {person.number}
				</li>
			))}
		</div>
	);
};
export default Filter;
