import { useActionState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import { NotificationContextProvider, useNotifactionContext } from "./components/NotificationContext";
const App = () => {
	const {
		data: anecdotes,
		isLoading,
		isError,
		error,
		update,
		remove,
	} = useAnecdotes();
 
  const {setNotification } = useNotifactionContext();
	const handleVote = (anecdote) => {
		update({ ...anecdote, votes: anecdote.votes + 1 });
    setNotification(`Voted on ${anecdote.content}`)
	};

	const handleDelete = (id) => {
    const anecdote = anecdotes.find(an => an.id === id);
		remove(id);
    setNotification(`removed ${anecdote.content}`)
    
	};

	if (isLoading) {
		return <div>loading ...</div>;
	}
	if (isError) {
		return <div>Error: {error.message}</div>;
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
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
						<button onClick={() => handleDelete(anecdote.id)}>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
