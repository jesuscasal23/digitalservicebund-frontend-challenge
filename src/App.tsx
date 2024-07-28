import { useEffect, useState } from 'react'
import useGetDepartments from './api/hooks/useGetDepartments'
import DepartmentRowWithElipsis from './components/DepartmentRowWithElipsis'
import StatBar from './components/StatBar'
import Navbar from './components/Navbar'

function App() {
  const { data: departments } = useGetDepartments()
  const [maximumNumber, setMaximumNumber] = useState(0)

  useEffect(() => {
    if (!departments) {
      return
    }
    const numbers = departments.map(department => department.datasets)
    setMaximumNumber(Math.max(...numbers))
  }, [departments])

  if (!departments) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <div className='min-h-full'>
        <div className='py-10'>
          <header>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold leading-tight tracking-tight text-gray-900'>
                Dashboard
              </h1>
            </div>
          </header>
          <main>
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
                          {departments.map(department => (
                            <tr key={department.id}>
                              <DepartmentRowWithElipsis
                                department={department}
                              />
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
          </main>
        </div>
      </div>
    </>
  )
}

export default App
