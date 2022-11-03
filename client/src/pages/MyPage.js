import React, {useContext, useEffect, useState, useRef} from 'react'
import axios from 'axios';
import '../utils/MyPage.css'
import logo from '../icon/logo.png';
import key from '../icon/digital-key.png'
import faucet from '../icon/faucet.png'
import header_img from '../icon/mypage_hearder.png'
import arrowdown from '../icon/arrow-down.png'
import arrowup from '../icon/navigate-up-arrow.png'
import dummy from '../components/market/dummy' // 임시로 더미데이ㅇ터 사용
import ItemList from '../components/market/ItemList'
import Feed from "../components/Feed.js";
import Popup from '../components/Popup'
import {UseContext} from '../User/UserContextProvider';
import {CopyToClipboard} from "react-copy-to-clipboard";
// 마이페이지 버튼 클릭 시 디비에서 데이터를 가져오게 Porp 줘야함
const MyPage = () => {
    const loadpage = "MyPage"
    // console.log(loadpage)
    // 서버 닫혔을때 테스트용
    // const [user, setUser] = useState({
    //     user_id: "test123",
    //     nickname: "yong",
    //     email: "asd@asd.com",
    //     address: "0x0811A41dC0f183Ae3eCF8113a90Cf4964AC6e901",
    //     token_amount: "0",
    //     eth_amount: "10",
    //     key: "0x0811A41dC0f183Ae3eCF8113a90Cf4964AC6e901"
    // });
    //서버열리면 사용하기 
    const {user, setUsers} = useContext(UseContext);
    // console.log(user);
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const [isCheck, setIsCheck] = useState(false) // 토큰 전송창 관리
    const [count, setCount] = useState(0);
    const [address, setAddress] = useState(null);
    // div클릭시 input 클릭한 효과를 내기 위해서 작성
    const selectFile = useRef("")
    
    // 이미지 선택 후 서버로 전송
    const onLoadFile = (e) => {
        let input = e.target;
        let reader = new FileReader();
        reader.onload = function () {
            let dataURL = reader.result;
            console.log(dataURL)
            let userIMG = document.getElementById('user-img')
            userIMG.src = dataURL;
            // 서버로 보내기
            axios.post("http://localhost:5000/login", {
                image: dataURL,
            }, {withCredentials: true})
            .then(function (response) {
                setPopup({
                       open:true,   
                       message: "저장되었습니다.", 
                        });
            })
            .catch((Error) => {
                console.log("실패")
                console.log(Error);
            })
        };
        reader.readAsDataURL(input.files[0]);
    }
    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const onChangeCount = (e) => {
        setCount(e.target.value)
    }
    const transmission =() =>{
        // 토큰 전송 버튼 
        console.log(`주소 : ${address}, 갯수 : ${count}`)
    }

    return (
        <div className='Mypage'>
            {/* 헤더 */}
            <div className='Mypage-Header'>
                <img className='Mypage-Header-img' src={header_img}/>

            </div>
            {/* 유저정보 */}
            <div className='Mypage__userinfo'>
                <input
                    type='file'
                    id='fileInput'
                    accept='img/*'
                    style={{
                        display: "none"
                    }}
                    ref={selectFile}
                    onChange={onLoadFile}></input>
                <img
                    id='user-img'
                    className='Mypage__userinfo-img'
                    src={logo}
                    onClick={() => {
                        selectFile
                            .current
                            .click()
                    }}></img>
                <div className='Mypage__userinfo-cont'>
                    <sapn className='Mypage__userinfo-cont-name'>
                        {user.nickname}
                    </sapn>
                    <sapn className='Mypage__userinfo-cont-id'>
                        {user.user_id}
                    </sapn>
                </div>
            </div>
            {/* 아래 게시물 + 정보 컨테이너 */}
            <div className='Mypage__content'>
                <div className='Mypage__content-grup'>
                    <div className='Mypage__content-grup-info'>
                        내정보
                        <div className='Wallet__address'>
                            <div className='displayflex'>
                                <span className='span_title'>
                                    지갑주소
                                </span>
                                <div className="tooltip2">
                                    <span className='tooltip-content'>{user.address}</span>
                                    <CopyToClipboard text={user.address} onCopy={() => alert("키값이 복사되었습니다")}>
                                    <img src={key} className="arrow_key"/>
                                    </CopyToClipboard>
                                    
                                </div>
                            </div>
                            <div className='displayflex'>
                                <img
                                    src={faucet}
                                    className="faucet-btn"
                                    onClick={() => window.open('https://goerlifaucet.com/', '_blank')}/>
                                <span className='span_content'>
                                    {user.address}
                                </span>
                            </div>
                        </div>

                        <div className='token__account'>
                            <span className='span_title'>
                                나의 토큰 개수
                            </span>
                            <span className='span_content'>
                                {user.token_amount}개
                            </span>
                            <div className='center'>
                            <img className='open-transmission-container' src={`${isCheck? arrowup:arrowdown}`}
                            onClick={ ()=> {
                                if(isCheck === false){
                                    setIsCheck(true)
                                }else{
                                    setIsCheck(false)
                                }
                                }}/>
                                </div>
                            <div className={`transmission-container ${isCheck ? "displayblock" : ""}`}>
                                <input className='span_content' placeholder='대상 주소(address)' onChange={onChangeAddress}></input>
                                <input className='span_content' placeholder='보낼 개수(개)' onChange={onChangeCount}></input>
                            <button className='token__account-btn' onClick={transmission} >전송하기</button>
                            </div>
                        </div>

                    </div>
                    <div className='Mypage__content-grup-nft'>
                        NFT
                        <div className='nft-list'>
                            <ItemList
                                getItem={{
                                    dummy
                                }}
                                itemCount={6}/>
                        </div>
                    </div>
                </div>
                <div className='Mypage__MyPost'>
                    <div className='Mypage__MyPost-hearger'>
                        게시물
                    </div>
                    <div className='Mypage__MyPost-content'>
                        {/* 내가쓴것만 필터 */}
                        <Feed loadpage={loadpage}/>
                    </div>
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

export default MyPage
