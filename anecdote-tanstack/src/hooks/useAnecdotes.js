import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const baseUrl = "http://localhost:3001/anecdotes";
const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error)
  return data;
}

export function useAnecdotes() {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => request(baseUrl),
    refetchOnWindowFocus: false
  })

  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (anecdote) => request(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anecdote)
    }),
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      

    }
  })

  const update = useMutation({
    mutationFn: (updated) => request(`${baseUrl}/${updated.id}`, {
      method: "PUT",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(updated)
    }),
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'], (old) => old.map(an => an.id === updated.id ? updated : an))
    }
  })

  const remove = useMutation({
    mutationFn: (id) =>
      request(`${baseUrl}/${id}`, {
        method: "DELETE"
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    createAsync: create.mutateAsync,
    isCreating: create.isPending,
    isCreateSuccess: create.isSuccess,
    isCreateError: create.isError,
    createError: create.error,
    update: update.mutate,
    remove: remove.mutate,
    
    isUpdating: update.isPending,
    isRemoving: remove.isPending
  }
}

