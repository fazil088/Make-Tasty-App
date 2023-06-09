import React,{useState,useEffect,useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom'
import {PacmanLoader} from 'react-spinners'
import { FirebaseContext } from '../../store/ContextStore';
import './SignUp.css';

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
    },2000)

    return ()=>clearTimeout(timer)
  },[])

  if(isLoading || isSubmitted){
    return (
      <div className='loader'>
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
            phoneNumber:mobilNumber,
            password:password,
            email:email,
          })
          .finally(()=>{
            setIsSubmitted(false)
            setSignUpIs(false)
            setLoginIs(true)
          })
        }).catch((err)=>{
          alert(err.message)
        })
      })
      .catch((err)=>{
        alert(err.message)
        setIsSubmitted(false)
        setSignUpIs(true)
        setLoginIs(false)
      })
      
  }

  function handleLogin(e){
    e.preventDefault()
    setIsSubmitted(true)
    firebase.auth().signInWithEmailAndPassword(loginEmail,loginPassword).then(()=>{
      history('/Make-Tasty-App')
    }).catch((err)=>{
      alert(err.message)
    }).finally(()=>{
      setIsSubmitted(false)
    })
  }
  
  return (
    <React.Fragment>
      <div className='CompanyLogo'></div>
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
    <div><Link className='bi bi-arrow-right' to={ '/Make-Tasty-App'} ></Link></div>
    </div>
    </React.Fragment>

    
  )
}

export default SignUp