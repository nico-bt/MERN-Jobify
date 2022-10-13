import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Navbar, SmallSidebar, BigSidebar } from '../../components'
import Wrapper from  "../../assets/wrappers/SharedLayout"

function SharedLayout() {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* Small/Big sidebar are toggled via css media queries {display} */}
        <SmallSidebar />
        <BigSidebar />
        
        <div>
          <Navbar />
          <div className='dashboard-page'>
            {/* Outlet = Nested Pages in React-Router */}
            <Outlet />
          </div>
        </div>

      </main>
    </Wrapper>
  )
}

export default SharedLayout