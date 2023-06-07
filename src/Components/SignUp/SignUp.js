import React,{useState,useEffect,useContext} from 'react';
import { useNavigate} from 'react-router-dom'
import {PacmanLoader} from 'react-spinners'
import './SignUp.css';
import Header from '../Header/Header';
import { FirebaseContext } from '../../store/FirebaseContext';

function SignUp() {
  const [loginIs,setLoginIs] = useState(false)
  const [signupIs,setSignUpIs] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [mobilNumber,setMobileNumber] = useState('')
  const [password,setPassword] = useState('')
  const [isSubmitted,setIsSubmitted] = useState(false)
  const {firebase} = useContext(FirebaseContext)

  const [loginEmail,setLoginEmail] = useState('')
  const [loginPassword,setLoginPassword] = useState('')

  const history = useNavigate()


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsLoading(false)
    },3000)

    return ()=>clearTimeout(timer)
  },[])

  if(isLoading || isSubmitted){
    return (
      <div className='loader'>
        <Header/>
        <PacmanLoader className='loaderItem'  color='#79AEB2'/>
      </div>
    )
  }

  function handleSubmit(e){
    e.preventDefault()
    setIsSubmitted(true)

      firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
        result.user.updateProfile({displayName:username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            name:username,
            phone:mobilNumber,
            password:password,
            email:email
          })
        })
      }).catch((err)=>{
        alert(err.message)
      }).finally(()=>{
        setIsSubmitted(false)
        setSignUpIs(false)
        setLoginIs(true)
      })
  }

  function handleLogin(e){
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(loginEmail,loginPassword).then(()=>{
      history('/')
    }).catch((err)=>{
      alert(err.message)
    })
  }
  
  return (
    <React.Fragment>
      <Header/>
      <div className='signupPage'>
        <div className={`login ${loginIs && 'signup_bg'}`}>
    
        {signupIs && <div className={`signupInfo ${signupIs && 'visible2'}`}>
          <form id='form' onSubmit={handleSubmit}>
            <div className='inputFields'>
              <label htmlFor="">User Name</label>
              <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className='inputFields'>
              <label htmlFor="">E-mail</label>
              <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}  />
            </div>
            <div className='inputFields'>
              <label htmlFor="">Mobile Number</label>
              <input type="tel" required value={mobilNumber} onChange={(e)=>setMobileNumber(e.target.value)}  />
            </div>
           <div className='inputFields'>
              <label htmlFor="">Password</label>
              <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password must be 6 characters' />
           </div>
           <button className='Btn' type='submit'>Sign Up</button>
          </form>
          </div>}
        <button className={`loginClick`} onClick={()=>{
          setLoginIs(!loginIs)
        }} >Login</button>
        <p>Already have an account</p>
      </div>

              {/* Login */}

      <div className={`signup ${signupIs && 'login_bg'}`}>
        {loginIs && <div className={`loginInfo ${loginIs&&'visible1'}`}>
          <form className="loginItems" onSubmit={handleLogin}>
            <div className='inputFields'>
              <label htmlFor="">E-mail</label>
              <input type="email" required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
            </div>  
            <div className='inputFields'>
              <label htmlFor="">Password</label>
              <input type="password" required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />
            </div>
            <button className='Btn'>Sign In</button>
          </form>
        </div>}
        <button className='signupClick' onClick={()=>{
          setSignUpIs(!signupIs)
        }} >SignUp</button>
        <p>Don't have an account?</p>
      </div>
    </div>
    </React.Fragment>

    
  )
}

export default SignUp