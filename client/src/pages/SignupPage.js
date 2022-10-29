import React from 'react'
import '../utils/SignupPage.css'

const USER_ID = document.querySelector("#user_id");
const SignupPage = () => {
    // 회원가입 버튼 클릭시 함수 실행
    function Sigup(){
      console.log(`아이디는 이거 : ${USER_ID}`);
      
    }
    return (
      <div className='SignupPage'>
        <div className='SignupPage__header'>
          회원가입
        </div>
        <div className='SignupPage__container'>
            <input id='user_id' className='SignupPage__container-input' required="required" maxLength="20" type="text" placeholder='아이디(ID)'/>
            <input id='password' className='SignupPage__container-input' required="required" maxLength="20" type="password" placeholder='비밀번호(Password)'/>         
            <input id='email' className='SignupPage__container-input' required="required" maxLength="20" type="text" placeholder='이메일(e-mail)'/>         
            <input id='nickname' className='SignupPage__container-input' required="required" maxLength="20" type="text" placeholder='닉네임(nicname)'/>         
            <button className='SignupPage__container-button'onClick={Sigup} >회원가입</button>   
        </div>
     </div>
    )
}

export default SignupPage