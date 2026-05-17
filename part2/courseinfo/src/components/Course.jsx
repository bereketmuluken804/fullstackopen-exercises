const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};
const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((sum, cur) => sum + cur.exercises, 0);
	return (
		<strong>
			<p>Total exercises {total}</p>
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

export default Course;
