import React, { useContext, useEffect } from 'react'
import '../utils/header.css'
import logo from '../icon/logo_icon.png'
import logo2 from '../icon/logo.png'
import axios from 'axios'
import {Link} from 'react-router-dom';
import { UseContext } from '../User/UserContextProvider';

const Header = () => {
    const {cookies,setCookiesHandler} =useContext(UseContext);
    const {user,setUsers} =useContext(UseContext);
    useEffect(()=>{
        axios.get("http://localhost:5000/confirm",{withCredentials: true})
        .then((res)=>{
            setUsers(res.data.data);
            setCookiesHandler(res.data.ckeck);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[]);

    return (
        <div className='header'>
            {/* 로고 */}
            <div className='logocase'>
            <Link to="/">
                <img src={logo2} className='logo'/>
                {/* <img src={logo} className='logo'/> */}
                </Link>
            </div>
            {/* 네비게이션 메뉴 */}
            {/* <Link></Link> */}
            <div className='header__navmenu'>
                {/* 마켓 버튼 */}
                <div className='header__navmenu__button'>
                    <Link to="/market" className='link'>
                        <a className='header__navmenu__button__icon'>
                            Market
                        </a>
                    </Link>
                </div>
                {/* 마이페이지 버튼 */}
                <div className='header__navmenu__button'>
                    <Link to="/mypage">
                        <a className='header__navmenu__button__icon'>
                            MyPage
                        </a>
                    </Link>
                </div>
                {/* 로그인 버튼 */}
                <div className='header__navmenu__button'>
                <Link to="/login">
                        <a className='header__navmenu__button__icon'>
                            Login
                        </a>
                    </Link>
                </div>
                {/* 로그아웃 버튼 */}
                <div className='header__navmenu__button'>
                    <a className='header__navmenu__button__icon'>
                        LogOut
                    </a>
                </div>
                {/* 회원가입 버튼 */}
                <div className='header__navmenu__button'>
                    <Link to="/signup">
                        <a className='header__navmenu__button__icon'>
                            Signup
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Header