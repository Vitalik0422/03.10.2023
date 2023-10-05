import React from 'react'
import {useRouteError, NavLink} from 'react-router-dom'

const Errorpage = () => {
    const error = useRouteError()
  return (
    <>
    <h1>Ooops</h1>
    <p>Something went wrong</p>
    <p>{error.message ?? error.status}</p>
    <NavLink to='/'>MAIN</NavLink>
    </>
  )
}

export default Errorpage