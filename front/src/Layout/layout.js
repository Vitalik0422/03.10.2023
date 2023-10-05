import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <>
    <main>
    <Outlet></Outlet>
    </main>
    <footer>
        <NavLink to='/login'>LOGIN</NavLink>
    </footer>
    </>
  )
}

export default layout