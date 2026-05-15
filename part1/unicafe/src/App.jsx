import { useState } from "react";
const Stat = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const rawAvg = (good - bad) / total;
	const avg = Math.round(rawAvg * 100) / 100;
	const pos = Math.round((good / total) * 100) / 100;
	if (total === 0)
		return (
			<div>
				<h2>Statistics</h2> No feedback given
			</div>
		);
	return (
		<div id="stat">
			<h2>Statistics</h2>
			<p>Good: {good} </p>
			<p>Neutral: {neutral} </p>
			<p>Bad: {bad} </p>
			<p>Total feedback: {total}</p>
			<p>Average ( -1 to 1): {avg || 0} </p>
			<p>positve: {pos || 0}%</p>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<div>
				<h1>How is our service?</h1>
				<button onClick={() => setGood(good + 1)}>😁Good</button>
				<button onClick={() => setNeutral(neutral + 1)}>
					😏Neutral
				</button>
				<button onClick={() => setBad(bad + 1)}>😒Bad </button>
			</div>
			<Stat good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
