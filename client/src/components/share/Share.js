import React from "react";
import "./share.css";
import {useState, useEffect, useCallback} from 'react'
import {PermMedia, Label, Room, EmojiEmotions} from "@material-ui/icons"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Share = () => {

  const navigator = useNavigate();
 //게시글 값 상태 저장
  const [userId, setUserId] = useState('')  //아이디
  const [nickName, setNickName] = useState('')  //닉네임
  const [content, setContent] = useState('')  //내용
  

 const getContent =(e) =>{
   const content = e.target.value
   setContent(content)
 }

 function Share() {
   axios.post("http://localhost:5000/post/postsave",{
      user_id : 'yoo',
      nickname : 'hello',
      content : content,
    },{withCredentials: true})
    .then(function (response) {
      console.log("성공")
      console.log(response.data);
      window.location.replace("/")
          })
    .catch((Error)=>{
      console.log("실패")
      console.log(Error);
    })  
}

   

    return (
        <div className="share">

          <div className="shareWrapper">

              <div className="shareTop">
                <img className="shareProfileImg" src="logo512.png" alt=""/>  
                <input className="shareInput" placeholder="게시글을 입력해주세요." onChange={getContent} />
              </div>
              <hr className="shareHr"/>

              <div className="shareBottom">

                  <div className="shareOptions">

                     <div className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                     </div>

                     <div className="shareOption">
                        <Label htmlcolor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                     </div>

                     <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                     </div>

                     <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Emotions</span>
                     </div>

                  </div>
                  
                    <button className="shareButton" onClick={Share}>등 록</button>
                    
              </div>
        
          </div>

        </div>
    )
}

export default Share;