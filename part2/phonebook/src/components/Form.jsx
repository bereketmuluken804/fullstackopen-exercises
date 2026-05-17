const Form = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<h1>Add new Phone</h1>

			<label htmlFor="name">Name: </label>
			<input
				value={props.newName}
				onChange={props.handleNameChange}
				type="text"
				name="person-name"
				id="name"
			/>

			<div>
				<label htmlFor="number">Number: </label>
				<input
					value={props.newNum}
					onChange={props.handleNumChange}
					type="text"
					name="number"
					id="number"
				/>
			</div>
			<div>
				<button type="submit">Add</button>
			</div>
		</form>
	);
};
export default Form;