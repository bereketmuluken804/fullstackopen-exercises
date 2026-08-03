import { useActionState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
const App = () => {
  const {data: anecdotes, isLoading, isError, error, update, remove}= useAnecdotes();

  const handleVote = (anecdote) => {
    update({...anecdote, votes: anecdote.votes + 1});
  }

  const handleDelete = (id) => {
    remove(id);
  }


  if(isLoading){
    return <div>loading ...</div>
  }
  if(isError) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            <button onClick={()=> handleDelete(anecdote.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App