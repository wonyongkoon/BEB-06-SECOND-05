import React from 'react'
import { Form } from 'react-router-dom'
import '../utils/LoginPage.css'

const LoginPage = () => {
  return (
    
    <div className='LoginPage'>
        <div className='LoginPage__container'>
            <input className='LoginPage__container-input' required="required" maxLength="15" type="text" placeholder='아이디(ID)'/>
            <input className='LoginPage__container-input' required="required" maxLength="15" type="password" placeholder='비밀번호(Password)'/>         
            <button className='LoginPage__container-button' >Log In</button>
            <a href="#">Find E2I2 Account or Password</a>
        </div>
     </div>
    
  )
}

export default LoginPage