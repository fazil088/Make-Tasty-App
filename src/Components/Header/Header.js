import React, { useContext, useState } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../store/ContextStore'
import Navbar from '../Navbar/Navbar';
import logoImage from '../../ConstImages/logo.jpg'


function Header() {
  const [isClicked,setIsClicked] = useState(false)
  const {user} = useContext(AuthContext)
  return (
    <div className='header'>
      <div className="child_header">
        <div className='logoHeader'>
          <img src={logoImage} alt="" />
        </div>
        <div className="menu_section">
            <div className="signUpOrLogin">
              <i className='bi bi-person-circle'></i>
                {
                  user ? <h5>{user && user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}</h5> 
                  : <Link className='linkLogin' to='/login'>Login/SignUp</Link>
                }
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
