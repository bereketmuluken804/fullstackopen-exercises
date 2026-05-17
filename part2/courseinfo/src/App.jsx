const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Part = ({ part }) => {
	return (
		<>
			<p>
				{part.name} {part.exercises}
			</p>
		</>
	);
};
const Content = (props) => {
	return (
		<>
			<Part part={props.parts[0]} />
			<Part part={props.parts[1]} />
			<Part part={props.parts[2]} />
		</>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((sum, cur) => sum + cur.exercises, 0);
	return (
		<strong>
			<p>Number of exercises {total}</p>
		</strong>
	);
};
const Course = ({ course }) => {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};
const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return <Course course={course} />;
};

export default App;
