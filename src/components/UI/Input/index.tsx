import { useMemo } from 'react'

type InputProps = {
  type: 'text' | 'number'
  placeholder: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  extraClasses?: string
}

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  extraClasses,
}: InputProps) => {
  const className = useMemo(() => {
    const baseClassNames =
      'block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    return baseClassNames + ' ' + extraClasses
  }, [extraClasses])

  return <input {...{ value, onChange, type, placeholder, name, className }} />
}

export default Input
