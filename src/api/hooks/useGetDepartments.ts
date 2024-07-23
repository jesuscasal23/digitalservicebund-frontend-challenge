import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import queryKeys from '../../constants/queryKeys'
import axiosInstance from '../axios/axiosInstance'

const departmentsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    datasets: z.number(),
  })
)

export type Departments = z.infer<typeof departmentsSchema>

const fetchDepartments = async (): Promise<Departments> => {
  const response = await axiosInstance.get('/departments')

  const parsedData = departmentsSchema.safeParse(response.data)

  if (!parsedData.success) {
    // ideally you would log this to a logging service
    console.error('Validation error:', parsedData.error)
    throw new Error('Invalid response format')
  }

  return response.data
}

// Create the custom hook
const useGetDepartments = () => {
  return useQuery<Departments, Error>({
    queryKey: [queryKeys.DEPARTMENTS],
    queryFn: fetchDepartments,
  })
}

export default useGetDepartments
