import React, {useContext} from "react";
import "./sidebar.css";
import {UseContext} from '../../User/UserContextProvider'


const Sidebar = () => {
  const {user, image, cookies} = useContext(UseContext);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <span>
            <p className="sideTitle">IU 팬카페 커뮤니티</p>
            <p className="sideText">IU 팬카페에서 팬분들과 자유롭게 소통하고, NFT를 구매하여 소중한 추억을 평생 소장하세요!</p>
            <p className="sideText">구매하신 NFT는 Mypage에서 언제든 확인가능합니다.</p>
        </span>
        </div>
    <div className={`sidebarWrapper ${cookies ? '':'image-none'}`}>
      <div >
        <div >
          <img
            alt="logo"
            style={{
              height: 150,
              width: 150,
              border: "4px solid #fff",
              borderRadius: "50%"
            }}
            src={image}
          />
        </div>
        <div>
          <h4 className="sideTitle">{user.nickname}</h4>
        </div>
          <div className="sideText">{user.user_id}</div>
          <div className="sideText">{user.email}</div>
        </div>
      </div>
      </div>
  )
}

export default Sidebar
