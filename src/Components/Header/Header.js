import React, { useContext } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../store/FirebaseContext'

function Header() {

  const {user} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className="child_header">
        <div className="logo_section">
            <h3 className='logo'>Make Tasty</h3>
            <div className='searchInput'>
            <input type="text"/>
            <i className='bi bi-search'></i>
            </div>
        </div>
        <div className="menu_section">
            <div className="signUpOrLogin">
                <i className='bi bi-person-circle'></i>
                <h5>{user && user.displayName}</h5>
                {user ? '' : <Link className='linkLogin' to='/login'>Login/SignUp</Link>}
            </div>
            <i className='bi bi-list'></i>
        </div>
      </div>
      
    </div>
  )
}

export default Header
