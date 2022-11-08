import React, { useState, useContext, useEffect } from 'react'
import '../utils/header.css'
import Popup from '../components/Popup'
import logo from '../icon/logo.png'
import axios from 'axios'
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { UseContext } from '../User/UserContextProvider';

const Header = () => {
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const {cookies,setCookiesHandler,setUserImage} =useContext(UseContext);
    const {user,setUsers} =useContext(UseContext);
    const navigator = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:5000/confirm",{withCredentials: true})
        .then((res)=>{
            if(res.data.ckeck===true){
                res.data.data.nft=res.data.nft;
                const userdata =res.data.data;
                setUsers({
                ...user,
                user_id:userdata.user_id,
                nickname:userdata.nickname,
                email:userdata.email,
                address:userdata.address,
                token_amount:userdata.token_amount,
                eth_amount:userdata.eth_amount,
                mynft:userdata.nft,
                });
                setCookiesHandler(res.data.ckeck);
                setUserImage(res.data.image[0].image);
            }
            else{
                setCookiesHandler(res.data.ckeck);
            }
           
        })
        .catch((err)=>{
            console.log(err);
        })
    },[cookies]);

    function Logout(){
        console.log("로그아웃 버튼눌림")
        axios
            .post("http://localhost:5000/logout", {
            }, {withCredentials: true})
            .then(function (response) {
                setCookiesHandler(false);
                setUserImage("");
                setUsers({});
                setPopup({
                       open:true,   
                       message: "로그아웃 되었습니다.", 
                       callback: function(){     
                            navigator("/login")   } 
                        });
            })
            .catch((Error) => {
                console.log("실패")
                console.log(Error);
            })
    }
    return (
        <div className='header'>
            {/* 로고 */}
            <div className='logocase'>
            <Link to="/">
                <img src={logo} className='logo' alt='logo'/>
                
                </Link>
            </div>
            {/* 네비게이션 메뉴 */}
            <div className='header__navmenu'>
                {/* 마켓 버튼 */}
                <div className='header__navmenu__button'>
                    <Link to="/market" className='link'>
                        <span className='header__navmenu__button__icon'>
                            Market
                        </span>
                    </Link>
                </div>
                {/* 마이페이지 버튼 */}
                <div className={`header__navmenu__button ${cookies ? '':'btn-none'}`}>
                    <Link to="/mypage">
                        <span className='header__navmenu__button__icon'>
                            MyPage
                        </span>
                    </Link>
                </div>
                {/* 로그인 버튼 */}
                <div className={`header__navmenu__button ${cookies ? 'btn-none' : ''}`}>
                <Link to="/login">
                        <span Link="/login" className='header__navmenu__button__icon'>
                            Login
                        </span>
                    </Link>
                </div>
                {/* 로그아웃 버튼 */}
                <div className={`header__navmenu__button ${cookies ? '':'btn-none'}`}>
                    <Link>
                    <span className='header__navmenu__button__icon' onClick={Logout}>
                        LogOut
                    </span>
                    </Link>
                </div>
                {/* 회원가입 버튼 */}
                <div className={`header__navmenu__button ${cookies ? 'btn-none' : ''}`}>
                    <Link to="/signup">
                        <span className='header__navmenu__button__icon'>
                            Signup
                        </span>
                    </Link>
                </div>
            </div>
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}/>
        </div>
    )
}

export default Header