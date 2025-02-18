import { useEffect, useState } from 'react'
import DepartmentRowWithElipsis from './DepartmentRowWithElipsis'
import useGetDepartments, {
  type DepartmentsTypeWithRank,
} from '../../api/hooks/useGetDepartments'
import { addRankToDepartments } from './helpers'
import StatBar from './StatBar'

type ContributionsTableProps = {
  minContributionsFilter: number
  nameFilter: string
}

const ContributionsTable = ({
  minContributionsFilter,
  nameFilter,
}: ContributionsTableProps) => {
  const { data: departments, isLoading } = useGetDepartments()

  const [filteredAndRankedDepartments, setfilteredAndRankedDepartments] =
    useState<DepartmentsTypeWithRank>([])
  const [totalAmountOfContributions, setTotalAmountOfContributions] =
    useState(0)

  useEffect(() => {
    if (!departments) {
      return
    }

    // Step 1: Get the total amount of contributions
    const totalAmount = departments.reduce((acc, department) => {
      return acc + department.datasets
    }, 0)
    setTotalAmountOfContributions(totalAmount)

    // Step 2: Add the rank to the departments
    const departmentsStatsWithRank = addRankToDepartments(departments)

    let departmentsafterFilteringAndRanking = departmentsStatsWithRank

    // Step 3: Filter the departments by name
    if (nameFilter) {
      departmentsafterFilteringAndRanking =
        departmentsafterFilteringAndRanking.filter(department => {
          return department.name
            .toLowerCase()
            .includes(nameFilter.toLowerCase())
        })
    }

    console.log(minContributionsFilter)

    // Step 4: Filter the departments by contributions
    if (minContributionsFilter && !isNaN(minContributionsFilter)) {
      departmentsafterFilteringAndRanking =
        departmentsafterFilteringAndRanking.filter(department => {
          return department.datasets >= minContributionsFilter
        })
    }

    setfilteredAndRankedDepartments(departmentsafterFilteringAndRanking)
  }, [departments, minContributionsFilter, nameFilter])

  if (isLoading || filteredAndRankedDepartments.length === 0) {
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
                      Contributions Ranking
                    </th>

                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      % of total contributions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {filteredAndRankedDepartments.map(department => (
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
                          maximumNumber={totalAmountOfContributions}
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
