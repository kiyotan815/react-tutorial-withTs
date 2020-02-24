import React from 'react'
import { SquareType } from './type'


interface SquareProps {
  value: SquareType
  onClick: () => void
}

function Square(props: SquareProps) {
  const { value, onClick } = props

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

export default Square
