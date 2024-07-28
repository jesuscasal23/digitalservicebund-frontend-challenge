import { useRef, useState, useEffect } from 'react'
import { DepartmentsTypeWithRankType } from '../api/hooks/useGetDepartments'

const DepartmentRowWithElipsis = ({
  department,
}: {
  department: DepartmentsTypeWithRankType[number]
}) => {
  const textRef = useRef(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const element = textRef.current as unknown as HTMLDivElement
    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth)
    }
  }, [department.name])

  return (
    <td className='relative whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 group'>
      <div ref={textRef} className='truncate max-w-[300px] overflow-hidden'>
        {department.name}
      </div>
      {isOverflowing && (
        <div className='absolute left-0 top-0 hidden w-auto min-w-full bg-white p-2 shadow-lg z-10 group-hover:block'>
          {department.name}
        </div>
      )}
    </td>
  )
}

export default DepartmentRowWithElipsis
