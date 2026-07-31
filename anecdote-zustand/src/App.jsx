import { useEffect } from 'react';
import { useAnecdoteActions, useAnecdotes, useNewAnc, useFilter, useNotifc} from './store'

const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const Notification = () => {
  const notific = useNotifc();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      <p>{notific}</p>
    </div>
  )
}

function Filter() {
  const filter = useFilter();
  const {setFilter} = useAnecdoteActions();
  const style = {
    padding: 10,
    marginBottom: 10
  }
  return <form style={style} onSubmit={(e)=>e.preventDefault()}>
    Filter <input type="text" name='filter' value={filter} onChange={({target})=>setFilter(target.value)}/>
  </form>
}
function AnecdoteList() {
  const anecdotes = useAnecdotes();
  const {addVote,  initialize, remove} = useAnecdoteActions();
  useEffect(() => {
    initialize()
  },[initialize])

  const vote = async(id) => {
    addVote(id); 
  }
  const deleteAnc = (id) => {
    remove(id)
  }
  if(anecdotes.length === 0) return <p>No Ancedotes </p>
  return <>
    {[...anecdotes].sort((a,b)=>b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            <button onClick={()=> deleteAnc(anecdote.id)}>Delete</button>
          </div>
        </div>
      ))}</>
}
function AnecdoteForm() {
  const {addVote, add, setNewAnc} = useAnecdoteActions();
  const newAnc = useNewAnc();
  
  
  const addAnecdote = (e) => {
    e.preventDefault();
   
    if(newAnc.trim() === "") return
    add(newAnc)
    setNewAnc("")
  }
  return <div>
         <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="new" value={newAnc} onChange={(e)=>setNewAnc(e.target.value)} />
        </div>
        <button>create</button>
      </form>
  </div>
}


export default App