import React,{useState} from 'react';
import './SignUp.css';

function SignUp() {
  const [loginIs,setLoginIs] = useState(false)
  const [signupIs,setSignUpIs] = useState(false)
  return (
    <div className='signupPage'>
      <div className={`login ${loginIs && 'signup_bg'}`}>
        {signupIs && <div className={`signupInfo ${signupIs && 'visible2'}`}>
          <form id='form' action="">
            <div className='inputFields'>
              <label htmlFor="">User Name</label>
              <input type="text" required />
            </div>
            <div className='inputFields'>
              <label htmlFor="">E-mail</label>
              <input type="email" required  />
            </div>
            <div className='inputFields'>
              <label htmlFor="">Mobile Number</label>
              <input type="tel" required  />
            </div>
           <div className='inputFields'>
              <label htmlFor="">Password</label>
              <input type="password" required  />
           </div>
           <button className='Btn' type='submit'>Sign Up</button>
          </form>
          </div>}
        <h2 className={`loginClick`} onClick={()=>{
          setLoginIs(!loginIs)
        }} >Login</h2>
        <p>Already have an account</p>
      </div>
      <div className={`signup ${signupIs && 'login_bg'}`}>
        {loginIs && <div className={`loginInfo ${loginIs&&'visible1'}`}>
          <form className="loginItems">
            <div className='inputFields'>
              <label htmlFor="">E-mail</label>
              <input type="email" required />
            </div>  
            <div className='inputFields'>
              <label htmlFor="">Password</label>
              <input type="password" required />
            </div>
            <button className='Btn'>Sign In</button>
          </form>
        </div>}
        <h2 className='signupClick' onClick={()=>{
          setSignUpIs(!signupIs)
        }} >SignUp</h2>
        <p>Don't have an account?</p>
      </div>
    </div>
  )
}

export default SignUp
