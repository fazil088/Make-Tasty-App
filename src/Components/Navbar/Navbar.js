import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import {AuthContext, FirebaseContext} from '../../store/ContextStore'
import { Link, useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import logoImage from '../../ConstImages/logo.jpg'


function Navbar({isVisible}) {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const [avatarLoading,setAvatarLoading] = useState(false)

  const [selectedImage,setSelectedImage] = useState(null)
  const [profileImage,setProfileImage] = useState('https://th.bing.com/th?id=OIP.dNfuZjZeZUmYxsqHRhYtSQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2')

  const navigate = useNavigate()

    function handleImageUpload(){
      setAvatarLoading(true)
      firebase.storage().ref(user.uid + '.png').put(selectedImage).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          user.updateProfile({photoURL: url})
          setProfileImage(url)
        })
      }).catch((err)=>{
        alert(err.message)
      }).finally(()=>{
        setAvatarLoading(false)
        setSelectedImage(null)
      })
  }

 
  useEffect(()=>{
    if(user?.photoURL){
      setProfileImage(user.photoURL)
    }
  },[user])
 


  return (
    <div className={`navbarBody ${isVisible? 'visible' : 'hidden'}`}>
      {
        user ? <div className='profileImage'>
        {user && <img src={profileImage} alt="" />}
        <div className='selectProfile'>
        <input className='fileUpload' type="file" onChange={(e)=>setSelectedImage(e.target.files[0])} />
        <i className='bi bi-camera'></i>
        </div>
        {  avatarLoading ? <div>
          <BeatLoader className='profileLoader' size={8} color='#006ba6' />
          </div> : selectedImage && <button className='uploadButton' onClick={handleImageUpload} >Upload</button>
        }
      </div> : <div className='navLogo'><img src={logoImage} alt="" /></div>
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
