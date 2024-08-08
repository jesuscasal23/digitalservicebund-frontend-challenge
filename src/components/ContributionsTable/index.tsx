import DepartmentRowWithElipsis from '../DepartmentRowWithElipsis'
import { useEffect, useState } from 'react'
import useGetDepartments from '../../api/hooks/useGetDepartments'
import StatBar from '../StatBar'

const ContributionsTable = () => {
  const { data: departments, isLoading } = useGetDepartments()

  const [filteredDepartments, setFilteredDepartments] = useState<
    typeof departments
  >([])
  const [maximumNumber, setMaximumNumber] = useState(0)

  useEffect(() => {
    if (!departments) {
      return
    }

    const numbers = departments.map(department => department.datasets)
    // Step 1: Set the maximum number for the StatBar component
    setMaximumNumber(Math.max(...numbers))

    // Step 2: Sort the data by the number of datasets
    const sortedData = [...departments].sort((a, b) => b.datasets - a.datasets)

    // Step 3: Assign ranks to the departments
    let rank = 1
    let previousNumberOfDepartments = sortedData[0].datasets

    const departmentStatsWithRank = sortedData.map(department => {
      // If the current number of departments is different from the previous one
      if (department.datasets !== previousNumberOfDepartments) {
        rank = rank + 1
      }
      previousNumberOfDepartments = department.datasets

      return { ...department, rank }
    })

    // Step 4: Set the filtered departments for display
    setFilteredDepartments(departmentStatsWithRank)
  }, [departments])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='mx-auto max-w-7xl px-4  sm:px-6 lg:px-8'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='mt-8 flow-root'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                      Name
                    </th>

                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Contributions No
                    </th>

                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Ranking
                    </th>

                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Proportion
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {filteredDepartments.map(department => (
                    <tr key={department.id}>
                      <DepartmentRowWithElipsis department={department} />
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {department.datasets}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {department.rank}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        <StatBar
                          currentNumber={department.datasets}
                          maximumNumber={maximumNumber}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContributionsTable
