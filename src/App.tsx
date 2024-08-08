import React, { useState } from 'react'
import Navbar from '@/components/UI/Navbar'
import Input from '@/components/UI/Input'
import ContributionsTable from './components/ContributionsTable'

function App() {
  const [nameSearch, setNameSearch] = useState('')
  const [minContributionsSearch, setMinContributionsSearch] = useState(0)

  const handleSetNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value)
  }

  const handleSetMinContributionsSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinContributionsSearch(parseInt(e.target.value))
  }

  return (
    <>
      <Navbar />

      <div className='min-h-full'>
        <div className='py-10'>
          <div className='flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 justify-between'>
            <h1 className='text-3xl font-bold leading-tight tracking-tight text-gray-900 ml-7'>
              Dashboard
            </h1>
            <div className='flex justify-end'>
              <Input
                name='name'
                type='text'
                placeholder='Name'
                onChange={handleSetNameSearch}
                value={nameSearch}
                extraClasses='mr-4'
              />

              <Input
                name='contributions'
                type='number'
                extraClasses='mr-4'
                value={minContributionsSearch}
                onChange={handleSetMinContributionsSearch}
              />
            </div>
          </div>

          <main>
            <ContributionsTable
              minContributionsFilter={minContributionsSearch}
              nameFilter={nameSearch}
            />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
