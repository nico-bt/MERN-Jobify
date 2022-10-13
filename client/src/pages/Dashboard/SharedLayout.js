import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Wrapper from  "../../assets/wrappers/SharedLayout"

function SharedLayout() {
  return (
    <Wrapper>
        <nav>
            <Link to='all-jobs'>all jobs</Link>
            <Link to='add-job' style={{marginLeft:"20px"}}>add job</Link>
        </nav>

        {/* Outlet = Nested Pages in React-Router */}
        <Outlet />

    </Wrapper>
  )
}

export default SharedLayout