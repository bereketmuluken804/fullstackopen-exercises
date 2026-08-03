import { useAnecdotes } from "../hooks/useAnecdotes"
import { useNotifactionContext } from "./NotificationContext";
const AnecdoteForm = () => {
  const { createAsync, isCreateError, isCreating, isCreateSuccess, createError } = useAnecdotes();
  const {setNotification, setMsg } = useNotifactionContext();
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset();
    try{
       await createAsync({content, votes: 0});
       setNotification(`Added ${content}`)
    }catch(error){
      setNotification(error.message)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        {!isCreating && <button type="submit">create</button>}
      </form>
    </div>
  )
}

export default AnecdoteForm