import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
	const [countries, setCountries] = useState([]);
	const [filterWord, setFilterWord] = useState("");
	const [selectedC, setSelected] = useState(null)
	useEffect(() => {
		axios
			.get(
				"https://studies.cs.helsinki.fi/restcountries/api/all",
			)
			.then((res) => {
				const filtered = res.data.map(entry=>{
					return {
						"name" : entry.name.common, 
						"capital" : entry.capital,
						"languages" : entry.languages,
						"flags" : entry.flags,
						"area" : entry.area,
						"population": entry.population
					}
				})
				setCountries(filtered);
				console.log(filtered);
			});
	}, []);

	const handleInput = (e) => {
		const value = e.target.value
		setFilterWord(value)
		setSelected(null)
	
	}

	const onShowDetails = (country) => {
		setSelected(country)
	}
	const filteredC = countries.filter(country=> country.name.toLowerCase().includes(filterWord.toLowerCase()))
	const displayC = filteredC.length === 1 ? filteredC[0] : selectedC
	return (
		<div>
			<label htmlFor="inp">Find Countries</label>
			<input type="text" id="inp" onChange={handleInput}/>
			
			<ShowCountries fc={filteredC} all={countries} onShowDetails={onShowDetails} />
			{displayC  && <ShowDetail country={displayC} />}
		</div>
	);
};

const ShowCountries = ({fc, all, onShowDetails}) => {
	if(all.length === 0)
		return <h3>Loading...</h3>

	if(fc.length > 15)
		return <h3>Too many matches, narrow down to a specific country.</h3>
	
	else if(fc.length === 0)
		return <h3>Country not found.</h3>	
	
	return (
		<>
		{fc.map(country=> (
			<li key={country.name}>{country.name} 
			<button onClick={()=> onShowDetails(country)}>Show Details</button>
			</li>
		))}
		</>
	)
}

const ShowDetail = ({country}) => {
	return (
			<>
				<h1>{country.name}</h1>
				<h3>Capital: {country.capital}</h3>
				<h3>Population: {country.population} </h3>
				<h3>Area: {country.area} Sq.Km.</h3>
				<h2>Languages</h2>
				<ul>
					{Object.values(country.languages).map(lang=> <li key ={lang}>{lang}</li>)}
				</ul>
				<img src={country.flags.png} alt={country.flags.alt} />
			</>
		)
}
export default App;
