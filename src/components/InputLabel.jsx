import React from 'react'

export const InputLabel = ({ text, state }) => {
  return (
    <>
      <p className={`login__inputTitle ${(state) ? "red" : ""}`} ><span>*</span> {text}</p>
    </>
  )
}
