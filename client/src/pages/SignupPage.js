import React from 'react'
import '../utils/SignupPage.css'
import {useState,} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'

const SignupPage = () => {
  // 회원가입 성공시 팝업창띄움
  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
  const navigator = useNavigate();
  // 입력값 유효성 검사---------------------------------------
  // 입력 값 상태 저장
  const [userId, setUserId] = useState('')  //아이디
  const [password, setPassword] = useState('')  //비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState('')  //비밀번호 확인
  const [email, setEmail] = useState('') // 이메일
  const [nickName, setNickName] = useState('')  //닉네임
  // 오류메세지 상태 저장
  const [userIdMessage, setUserIdMessage] = useState('')  //아이디
  const [passwordMessage, setPasswordMessage] = useState('')  //비밀번호
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')  //비밀번호 확인
  const [emailMessage, setEmailMessage] = useState('') // 이메일
  const [nickNameMessage, setNickNameMessage] = useState('')  //닉네임
  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false) //아이디
  const [ispassword, setIsPassword] = useState(false)  //비밀번호
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)  //비밀번호 확인
  const [isEmail, setIsEmail] = useState(false) // 이메일
  const [isNickName, setIsNickName] = useState(false) //닉네임

  // -----------------------------------------------------
  // 유저아이디 유효성 검사
  const onChangeUserId = (e) => {
    const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
    setUserId(e.target.value)
    if (checkSpc.test(e.target.value)) {
        setIsUserId(false)
        setUserIdMessage('아이디에 특수문자는 넣을 수 없습니다.')
    } else if (e.target.value.length === 0) {
        setIsUserId(false)
    } else if (!(e.target.value.length >= 5 || e.target.value.length > 15)) {
        setIsUserId(false)
        setUserIdMessage('아이디는 5글자 이상 15글자 미만으로 입력해주세요.')
    } else {
        setIsUserId(true)
        setUserIdMessage('사용가능한 아이디 입니다.')
        setUserId(e.target.value);
    }
};
  // 비밀번호 유효성 검사
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)
    if (!passwordRegex.test(e.target.value)) {
      setIsPassword(false)
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
    } 
    else {
      setIsPassword(true)
      setPasswordMessage('사용가능한 비밀번호 입니다.')
    }
};
  // 비밀번호 확인 유효성 검사
  const onChangePasswordConfirm  = (e) => {
    const passwordConfirmCurrent = e.target.value
    setPasswordConfirm(passwordConfirmCurrent)
    if (password === passwordConfirmCurrent) {
      setIsPasswordConfirm(true)
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요.')
      } 
    else {
      setIsPasswordConfirm(false)
      setPasswordConfirmMessage('비밀번호가 다릅니다.')
    }
};
 
 // 이메일 유효성 검사
 const onChangeEmail = (e) => {
  const checkSpc = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  setEmail(e.target.value)
  if (!checkSpc.test(e.target.value)) {
    setIsEmail(false)
    setEmailMessage('이메일형식이 틀렸어요 다시 확인해주세요')
  }
  else {
    setIsEmail(true)
    setEmailMessage('사용가능한 아이디 입니다.')
    setEmail(e.target.value);
  }
};

// 닉네임 유효성 검사
const onChangeNickName = (e) => {
  const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  setNickName(e.target.value)
  
  if (checkSpc.test(e.target.value)) {
    setIsNickName(false)
    setNickNameMessage('닉네임에 특수문자는 넣을 수 없습니다.')
  } else if (e.target.value.length === 0) {
    setIsNickName(false)
  } else if (!(e.target.value.length >= 2 || e.target.value.length > 15)) {
    setIsNickName(false)
    setNickNameMessage('닉네임은 2글자 이상 15글자 미만으로 입력해주세요.')
  } else {
    setIsNickName(true)
      setNickNameMessage('사용가능한 닉네임 입니다.')
      setNickName(e.target.value);
      
  }
};
  // 버튼 클릭 시 회원가입 데이터를 DB로 전송해줌 ------------------ 
    function SignUp() {
      console.log("버튼눌림")
        // 서버로 데이터 전송
        // axios.post("http://localhost:5000/test",{
        axios.post("http://localhost:5000/user/usersave",{
          user_id : userId,
          password : password,
          email : email,
          nickname : nickName,
        })
        .then(function (response) {
          console.log("성공")
          console.log(response.data);
              setPopup({
                open:true,
                message: "회원가입에 성공했습니다.",
                callback: function(){
                  navigator("/login")
                }
              });
        })
        .catch((Error)=>{
          console.log("실패")
          console.log(Error);
        })  
    }
    // -----------------------------------------------------
function dbtest(){
  console.log("테스트 버튼 눌림")
  axios.post("http://localhost:5000/user/userall",{
  })
  .then(function (response) {
    console.log("성공")
    console.log(response.data);
  })
  .catch((Error)=>{
    console.log("실패")
    console.log(Error);
  })
}
    return (
        <div className='SignupPage'>
            <div className='SignupPage__header'>
                회원가입
            </div>
            <div className='SignupPage__container'>
                <input
                    id='user_id'
                    name='id'
                    className='SignupPage__container-input'
                    required="required"
                    maxLength="20"
                    type="text"
                    placeholder='아이디(ID)'
                    onChange={onChangeUserId}
                    />
                {userId.length > 0 && <span className={`message${isUserId ? 'success' : 'error'}`}>{userIdMessage}</span>}
                
                {/*아이디 입력 테스트*/}<span>{userId}</span> 
                
                <input
                    id='password'
                    className='SignupPage__container-input'
                    required="required"
                    maxLength="20"
                    type="password"
                    placeholder='비밀번호(Password)'
                    onChange={onChangePassword}
                    />
                    {password.length > 0 && <span className={`message${ispassword ? 'success' : 'error'}`}>{passwordMessage}</span>}
                    {/*비밀번호 입력 테스트*/}<span>{password}</span> 
                <input
                    id='password2'
                    className='SignupPage__container-input'
                    required="required"
                    maxLength="20"
                    type="password"
                    placeholder='비밀번호 확인(Password)'
                    onChange={onChangePasswordConfirm}
                    />
                    {passwordConfirm.length > 0 && <span className={`message${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>}
                    {/*비밀번호 확인 입력 테스트*/}<span>{passwordConfirm}</span> 
                <input
                    id='email'
                    className='SignupPage__container-input'
                    required="required"
                    maxLength="20"
                    type="text"
                    placeholder='이메일(e-mail)'
                    onChange={onChangeEmail}
                    />
                    {email.length > 0 && <span className={`message${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
                    {/*이메일 입력 테스트*/}<span>{email}</span> 
                <input
                    id='nickname'
                    className='SignupPage__container-input'
                    required="required"
                    maxLength="20"
                    type="text"
                    placeholder='닉네임(nicname)'
                    onChange={onChangeNickName} 
                    />
                    {nickName.length > 0 && <span className={`message${isNickName ? 'success' : 'error'}`}>{nickNameMessage}</span>}
                    {/*닉네임 입력 테스트*/}<span>{nickName}</span> 
                <button className={`SignupPage__container-button-${!(isUserId && ispassword && isPasswordConfirm && isEmail && isNickName ) ? 'gray' : 'blue' } `} disabled={!(isUserId && ispassword && isPasswordConfirm && isEmail && isNickName )} onClick={SignUp}>회원가입</button>
                <button className='SignupPage__container-button' onClick={dbtest}>디비확인!(임시버튼)</button>
            </div>
            <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
        </div>
          
    )
}

export default SignupPage