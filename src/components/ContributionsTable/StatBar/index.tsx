import styled from 'styled-components'
import { useEffect, useState } from 'react'

const StyledBar = styled.div<{ $widthPercentage: number }>`
  background-color: red;
  border-radius: 0.5rem;
  height: 1.5rem;
  width: ${props => props.$widthPercentage}%;
`

type StatBarProps = {
  currentNumber: number
  maximumNumber: number
}

const StatBar = ({ currentNumber, maximumNumber }: StatBarProps) => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (maximumNumber === 0) {
      return
    }
    setPercentage((currentNumber / maximumNumber) * 100)
    console.log(percentage)
  }, [currentNumber, maximumNumber, percentage])

  return <StyledBar $widthPercentage={percentage} />
}

export default StatBar
