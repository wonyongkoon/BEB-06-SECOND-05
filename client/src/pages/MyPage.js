import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../utils/MyPage.css'
import logo from '../icon/logo.png';
import dummy from '../components/market/dummy' // 임시로 더미데이ㅇ터 사용
import ItemList from '../components/market/ItemList'
import Feed from "../components/Feed.js";

// 마이페이지 버튼 클릭 시 디비에서 데이터를 가져오게 Porp 줘야함
const MyPage = () => {




    return (
        <div className='Mypage'>
            {/* 헤더 */}
            <div className='Mypage-Header'>
                헤드
            </div>
            {/* 유저정보 */}
            <div className='Mypage__userinfo'>
                <img className='Mypage__userinfo-img' src={logo}/>
                <div className='Mypage__userinfo-cont'>
                    <sapn className='Mypage__userinfo-cont-name'>
                        유저 닉네임
                    </sapn>
                    <sapn className='Mypage__userinfo-cont-id'>
                        유저 아이디
                    </sapn>
                </div>
            </div>
            {/* 아래 게시물 + 정보 컨테이너 */}
            <div className='Mypage__content'>
                <div className='Mypage__content-grup'>
                    <div className='Mypage__content-grup-info'>
                        내정보
                        <div className='Wallet__address'> 
                          <span className='span_title'> 지갑주소 </span>
                          <span className='span_content'> asdasdasdafdfdsf </span> 
                        </div>
                        <div className='token__account'>
                          <span className='span_title'> 나의 토큰 개수 </span>
                          <span className='span_content'> 1000개 </span> 
                          <button className='token__account-btn' >전송하기</button>
                        </div>
                        
                    </div>
                    <div className='Mypage__content-grup-nft'>
                        NFT
                        <div className='nft-list'>
                          <ItemList getItem={{dummy}} itemCount={6} />
                        </div>
                    </div>
                </div>
                <div className='Mypage__MyPost'>
                    <div className='Mypage__MyPost-hearger'>
                      게시물
                    </div>
                    <div className='Mypage__MyPost-content'>
                      <Feed />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyPage
