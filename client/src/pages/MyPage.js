import React, { useState , useEffect} from 'react'
import axios from 'axios';

const MyPage = () => {
  let [UserInfo, setUserInfo] = useState([]);
  // const [isLoading, setIsLoding] = useState(true); // 로딩중인 화면 (시간되면 구현)
  // useEffect(() => {
  //   // setIsLoding(true); // 로딩 중 (시간되면 구현)
  //   fetch(`http://localhost:5000/`)
  //     .then(resp => resp.json())
  //     .then(result => {
  //       setUserInfo(result);
  //       // setIsLoding(false); // 로딩 중 (시간되면 구현)
  //     });
  // },);
  

  return (
    <div>
      <button>불러오기</button>
    </div>
  )
}

export default MyPage
