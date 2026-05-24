import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const Base_API = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

async function get_weather(location){
    try {
        const response = await fetch(`${Base_API}${location}?unitGroup=metric&key=${API_KEY}`);
        const result = await response.json();
        return result;
    }
    catch(err) {
        msgbox.textContent = "City Not Found";
        return null;
    }
}
const App = () => {
	const [countries, setCountries] = useState([]);
	const [filterWord, setFilterWord] = useState("");
	const [selectedC, setSelected] = useState(null)
	useEffect(() => {
		console.log("loading")
		
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
	const [weather, setWeather] = useState({});
	
	useEffect(()=>{
	 get_weather(country.capital[0])
		.then(res=>{
			const cond = res.currentConditions.conditions
			const temp = res.currentConditions.temp;
			const wind = res.currentConditions.windspeed;
			setWeather({...weather, temp, cond, wind})
	})
	}, [])

	
	
	return (
			<>
				<h1>{country.name}</h1>
				<h3>Capital(s): {country.capital.join(", ")}</h3>
				<h3>Population: {country.population} </h3>
				<h3>Area: {country.area} Sq.Km.</h3>
				<h2>Languages</h2>
				<ul>
					{Object.values(country.languages).map(lang=> <li key ={lang}>{lang}</li>)}
				</ul>
				<img src={country.flags.png} alt={country.flags.alt} />
				<h2>Weather in {country.capital[0]}</h2>
				<h3>Condition: {weather.cond} </h3>
				<h3>Temperature: {weather.temp} Celsius </h3>
				<h3>Wind: {weather.wind} m/s</h3>
			</>
		)
}
export default App;
