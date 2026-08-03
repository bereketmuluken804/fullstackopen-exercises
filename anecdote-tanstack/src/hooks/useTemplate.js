import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const baseUrl = 'http://localhost:3001/templates'

const request = async (url, options = {}) => {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export const useTemplate = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['templates'],
    queryFn: () => request(baseUrl),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })

  const create = useMutation({
    mutationFn: (template) =>
      request(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })

  const update = useMutation({
    // BUG FIX: the variable you pass to mutate() is the ONLY value
    // available in mutationFn. `id` does not exist in this scope, so
    // `${baseUrl}/${id}` produced "undefined" -> wrong URL -> 404.
    // Always derive the id from the mutation argument: updatedTemplate.id
    mutationFn: (updatedTemplate) =>
      request(`${baseUrl}/${updatedTemplate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTemplate),
      }),
    onSuccess: (updatedTemplate) => {
      queryClient.setQueryData(['templates'], (old) =>
        old.map((t) => (t.id === updatedTemplate.id ? updatedTemplate : t))
      )
    },
  })

  const remove = useMutation({
    mutationFn: (id) => request(`${baseUrl}/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    create: create.mutate,
    isCreating: create.isPending,
    update: update.mutate,
    isUpdating: update.isPending,
    remove: remove.mutate,
    isRemoving: remove.isPending,
  }
}
