import { useBad, useNeutral, useGood } from "../store/cafeStore";

const Statistics = () => {
  const good = useGood();
  const neutral = useNeutral();
  const bad =  useBad();
  const all = good + neutral + bad
  const average = all !== 0 ? (good - bad) / all : 0
  const positive = all !== 0 ? good/all : 0;
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{Math.round((average * 100) * 100)/ 100}</td></tr>
          <tr><td>positive</td><td>{Math.round((positive * 100) * 100)/100} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
