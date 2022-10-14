import { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import Wrapper from '../assets/wrappers/Navbar'

function Navbar() {
  const {toggleSidebar, showSidebar} = useAppContext()
  const [toggleDropdown, setToggleDropdown] = useState(false)
  
  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        <div className='btn-container'>
          <button className='btn' onClick={() => setToggleDropdown(!toggleDropdown)}>
            <FaUserCircle />
            john
            <FaCaretDown />
          </button>
          <div className={toggleDropdown? "dropdown show-dropdown" : "dropdown"}>
            <button onClick={() => console.log('logout user')} className='dropdown-btn'>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar