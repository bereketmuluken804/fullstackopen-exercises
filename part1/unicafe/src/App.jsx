import { useState } from "react";

const StatLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};
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
			<table>
				<thead>
					<tr>
						<th>FeedBack</th>
						<th>Count</th>
					</tr>
				</thead>

				<tbody>
					<StatLine text="Good" value={good} />
					<StatLine text="Neutral" value={neutral} />
					<StatLine text="Bad" value={bad} />
					<StatLine text="Total feedback" value={total} />
					<StatLine text="Average (-1 to 1)" value={avg || 0} />
					<StatLine text="positve" value={`${pos || 0}%`} />
				</tbody>
			</table>
		</div>
	);
};

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};
const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<div>
				<h1>How is our service?</h1>
				<Button
					onClick={() => {
						setGood(good + 1);
					}}
					text="😁Good"
				/>
				<Button
					onClick={() => setNeutral(neutral + 1)}
					text="😏Neutral"
				/>
				<Button onClick={() => setBad(bad + 1)} text="😒Bad" />
			</div>
			<Stat good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
