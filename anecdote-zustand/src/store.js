import { create } from 'zustand'
import {useShallow} from 'zustand/react/shallow';
import { devtools } from 'zustand/middleware';
import apiCalls from './services/apiCalls';

const useAnecdoteStore = create((set, get)=> ({
  anecdotes: [],
  newAnc: "",
  filter: "",
  notific: null,
  errmsg: null,
  actions: {
    addVote: async (id) => {
      const anc = get().anecdotes.find(an => an.id === id)
      if(!anc) return
      const updated = await apiCalls.update(id, {...anc, votes: anc.votes  + 1})
      set(state => ({anecdotes: state.anecdotes.map(an => an.id === id ? updated : an )}))
      get().actions.setNotification(`you voted ${updated.content}...`)
    },
    add: async(content) =>{
      const newNote = await apiCalls.create(content);
      set(state=> ({anecdotes: state.anecdotes.concat(newNote)}))
      get().actions.setNotification(`Added '${newNote.content}...`)
    },
    remove: async (id) => {
      await apiCalls.remove(id)
      set(state => ({anecdotes: state.anecdotes.filter(an => an.id !== id)}))
      get().actions.setNotification("Deleted Note");
    },
    initialize: async () => {
      const anecdotes = await apiCalls.getAll();
      set(()=> ({anecdotes}))
    },
    setNewAnc: anc => set(state => ({newAnc: anc})),
    setFilter: value => set(state => ({filter: value})),
    setNotification: (msg)=> {
      set({notific: msg})
      setTimeout(() => {
        set({notific: null})
      }, 5000)
    }
  }
}))

export const useAnecdotes = () => useAnecdoteStore(useShallow(({anecdotes, filter}) => {
  const filtered = anecdotes.filter(anc => anc.content.includes(filter));
  if(filtered) return filtered;
    return anecdotes;
}));
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions);
export const useNewAnc = () => useAnecdoteStore(state => state.newAnc);
export const useFilter = () => useAnecdoteStore(state => state.filter);
export const useNotifc = () => useAnecdoteStore(state => state.notific);
