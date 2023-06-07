import React, { useContext } from 'react'
import './Navbar.css'
import {AuthContext, FirebaseContext} from '../../store/FirebaseContext'
import { useNavigate } from 'react-router-dom'

function Navbar({isVisible}) {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <div className={`navbarBody ${isVisible? 'visible' : 'hidden'}`}>
      <ul>
        <li onClick={()=>navigate('/')}>Home</li>
        <li onClick={()=>{
            if(user){
              firebase.auth().signOut();
              navigate('/')
            }
        }}>Logout</li>
      </ul>
    </div>
  )
}

export default Navbar
