import React, { useState } from 'react'
import "./Login.css"
import logo from "../../assets/logo.png"
import { login, signup } from '../../firebase'
import netflix_spinner from "../../assets/netflix_spinner.gif"
import background_banner from "../../assets/background_banner.jpg"

const Login = () => {

  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lodding, setLodding] = useState(false);

  const user_auth = async (event)=>{
    event.preventDefault();
    setLodding(true);
    if(signState==="Sign In"){
      await login(email, password);
    }else{
      await signup(name, email, password);
    }
    setLodding(false); 
  }

  return ( 
    lodding?<div className="login-spinner">
    
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <div className="bg" style={{ backgroundImage: `linear-gradient(#0000006d, #00000090), url(${background_banner})` }}>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up"?
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your Name' />:<></>} 
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Your Email' />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Your Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In"?
          <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          :<p>Already have Account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
        }
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login