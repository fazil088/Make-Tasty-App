import React, { useContext, useState } from 'react'
import './Navbar.css'
import {AuthContext, FirebaseContext} from '../../store/FirebaseContext'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({isVisible}) {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)


  const [image,setImage] = useState(null)

  const navigate = useNavigate()

  return (
    <div className={`navbarBody ${isVisible? 'visible' : 'hidden'}`}>
      {
        user && <div className='profileImage'>
        <img src={image ? URL.createObjectURL(image) : "" } alt="" />
        <input className='fileUpload'  type="file" onChange={(e)=>setImage(e.target.files[0])} />
        <h6>{user.displayName}</h6>
      </div>
      }
      <ul>
        <li onClick={()=>navigate('/Make-Tasty-App')}>Home</li>
        <li>Settings</li>
        {
          user ? <li onClick={()=>{
            if(user){
              firebase.auth().signOut();
              navigate('/login')
            }
        }}>Logout</li> : <li><Link className='loginLink' to='/login'>Login</Link></li>
        }
      </ul>
    </div>
  )
}

export default Navbar
