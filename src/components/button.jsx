import React from 'react'

const Button = ({handleAdd,className,text}) => {
  return (
    <button  className={className} onClick={handleAdd} >{text}</button>
  )
}

export default Button