import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import queryKeys from '../../constants/queryKeys'
import axiosInstance from '../axios/axiosInstance'

const departmentsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    datasets: z.number(),
  })
)

export type Departments = z.infer<typeof departmentsSchema>

const fetchDepartments = async () => {
  const response = await axiosInstance.get('/departments')

  const parsedData = departmentsSchema.safeParse(response.data)

  if (!parsedData.success) {
    // ideally you would log this to a logging service
    console.error('Validation error:', parsedData.error)
    throw new Error('Invalid response format')
  }

  const sortedData = [...parsedData.data].sort(
    (a, b) => b.datasets - a.datasets
  )

  // Step 2: Assign ranks without gaps
  let rank = 1
  let previousNumberOfDepartments = sortedData[0].datasets

  return sortedData.map(department => {
    // If the current number of departments is different from the previous one
    if (department.datasets !== previousNumberOfDepartments) {
      rank = rank + 1
    }
    previousNumberOfDepartments = department.datasets

    return { ...department, rank }
  })
}

export type DepartmentsTypeWithRankType = Awaited<
  ReturnType<typeof fetchDepartments>
>

// Create the custom hook
const useGetDepartments = () => {
  return useQuery<DepartmentsTypeWithRankType, Error>({
    queryKey: [queryKeys.DEPARTMENTS],
    queryFn: fetchDepartments,
  })
}

export default useGetDepartments
