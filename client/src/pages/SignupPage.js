import React from 'react'
import '../utils/SignupPage.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
// let USER_ID = document.getElementById('user_id');
// const PASSWORD = document.getElementById('password');
// const EMAIL = document.getElementById('email');
// const NICKNAME = document.getElementById('nickname');

const SignupPage = () => {
    // 사용자의 input 입력값을 가져옴  -----------------------------
    const [account, setAccount] = useState({
      user_id : "",
      password : "",
      email : "",
      nickname :"",
    })
    const {user_id, password, email, nickname} = account;
    const onChange = (e) =>{
      const {name, value} = e.target;
      
      const nextInput ={
        ...account,
        [name] : value,
      }
      setAccount(nextInput);
    }
    // -----------------------------------------------------

    // 버튼 클릭 시 회원가입 데이터를 DB로 전송해줌 ------------------
    // user < 유저정보 테이블명
    // user_id    유저 아이디
    // nickname    닉네임
    // email            이메일
    // password        비밀번호
    // created_at         계정생성일
    function SignUp(){
      axios.get("http://localhost:5000")
      .then((Response)=>{console.log(Response.data)})
      // useEffect(() => {
      //   //여기서는 async await 을 쓸 수 없다.
      //   fetch("http://localhost:5000")
      //     .then((res) => {
      //       return res.json();
      //     })
      //     .then((data) => {
      //       // setpunkListData(data);
      //       // console.log("테스트1")
      //       console.log(data);
      //     });
      // }, []);
    }
    // -----------------------------------------------------

    return (
      <div className='SignupPage'>
        <div className='SignupPage__header'>
          회원가입
        </div>
        <div className='SignupPage__container'>
            <input name='user_id' className='SignupPage__container-input' required="required" maxLength="20" type="text" placeholder='아이디(ID)' value={user_id} onChange={onChange}/>
            <input name='password' className='SignupPage__container-input' required="required" maxLength="20" type="password" placeholder='비밀번호(Password)' value={password} onChange={onChange}/>         
            <input name='email' className='SignupPage__container-input' required="required" maxLength="20" type="text" placeholder='이메일(e-mail)' value={email} onChange={onChange}/>         
            <input name='nickname' className='SignupPage__container-input' required="required" maxLength="20" type="text" placeholder='닉네임(nicname)'value={nickname} onChange={onChange}/>         
            <button className='SignupPage__container-button'onClick={SignUp} >회원가입</button>   
        </div>
     </div>
    )
}

export default SignupPage