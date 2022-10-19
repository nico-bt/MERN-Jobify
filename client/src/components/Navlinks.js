import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import links from '../utils/links'

const NavLinks = ({ toggleSidebar }) => {
  const {clearValues} = useAppContext()
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end={true}
            // To delete Edit state values in context, and clear the form values for Add Job link
            // onClick={() =>{ 
            //   if(path=="add-job") { clearValues() 
            //   }
            // }}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks