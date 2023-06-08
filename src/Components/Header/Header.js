import React, { useContext, useState } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../store/FirebaseContext'
import Navbar from '../Navbar/Navbar'

function Header() {
  const [isClicked,setIsClicked] = useState(false)
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
                <h5>{user && user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}</h5>
                <i className='bi bi-person-circle'></i>
                {user ? '' : <Link className='linkLogin' to='/login'>Login/SignUp</Link>}
            </div>
              <i className={isClicked ? 'bi bi-x' : 'bi bi-list' } onClick={()=>{
                setIsClicked(!isClicked)
              }}></i>
              {isClicked && <Navbar/>}
        </div>
      </div>
      
    </div>
  )
}

export default Header
