import { useEffect } from 'react'
import useGetDepartments from './api/hooks/useGetDepartments'

function App() {
  const { data } = useGetDepartments()

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
