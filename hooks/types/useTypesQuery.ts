import { axi } from "@lib/fetchHelper"
import { typeQueries } from "@lib/queries/typeQueries"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"

const getQuery = (queryKey: string) => typeQueries.find((q) => q.queryKey === queryKey)

//GET
export const useTypesQuery = (queryKey: string) => {
  return useQuery(queryKey, getQuery(queryKey).queryFn, {})
}

const addType = async ({ data, queryKey }) => {
  return await axi.post(`/${queryKey}`, data)
}
const deleteType = async ({ itemId, queryKey }) => {
  return await axi.delete(`/${queryKey}/${itemId}`)
}
const editType = async ({ data, queryKey }) => {
  return await axi.put(`/${queryKey}/${data.id}`, data)
}

//POST
export const useAddType = (queryKey: string) => {
  const queryClient = useQueryClient()

  return useMutation(addType, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}

//DELETE
export const useDeleteType = (queryKey: string) => {
  const queryClient = useQueryClient()

  return useMutation(deleteType, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}

//EDIT
export const useEditType = (queryKey: string) => {
  const queryClient = useQueryClient()
  return useMutation(editType, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}
