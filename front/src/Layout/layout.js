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
        <br />
        <NavLink to='/registration'>REG</NavLink>
    </footer>
    </>
  )
}

export default layout