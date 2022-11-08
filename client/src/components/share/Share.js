import React from "react";
import "./share.css";
import {useState, useRef, useContext } from 'react'
import {PermMedia, EmojiEmotions} from "@material-ui/icons"  // 아이콘
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import {UseContext} from '../../User/UserContextProvider'
import Picker from 'emoji-picker-react'; // 이모지

const Share = () => {
  let dataURL ='';
  
  const {image,setUsers,user} = useContext(UseContext);
  // const navigator = useNavigate();
 //게시글 값 상태 저장
  const [content, setContent] = useState('')  //내용
  const [imgBoxTog, setImgBoxTog] = useState(false) // 이미지 있는지 확인
  const [postimage, setPostimage] =useState('') //게시글 이미지
  // 이모지 선택 --------------------------------------------------
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setContent(content + emojiObject.emoji) // 선택한 이모지값을 컨텐츠 값에 추가해준다.
  };
  //------------------------------------------------------------

  // textarea 크기 자동 조절
  const autoResizeTextarea = () => {
    let textarea = document.querySelector('.shareInput');

    if (textarea) {
      textarea.style.height = 'auto';
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height + 8}px`;
    }
  };
  
  // 이미지 업로드 ---------------------------
  const selectFile = useRef("")
  const onLoadFile = (e) => {
    let input = e.target;
    let reader = new FileReader();
    reader.onload = function(){
        dataURL = reader.result;
        let upLoadIMG = document.getElementById('upload-img')
        upLoadIMG.src = dataURL;
        setImgBoxTog(true);
        setPostimage(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  }

  const deleteImg = () => {
    setImgBoxTog(false);
    setPostimage('');
  }
 // ----------------------------------------

 const getContent =(e) =>{
   const content = e.target.value
   setContent(content);
 }

 function Share() {
   axios.post("http://localhost:5000/post/postsave",{
      content : content,
      image : postimage,
      userimage : image,
    },{withCredentials: true})
    .then((res)=> {
      if(res.status===200){
        setUsers({...user,token_amount:user.token_amount+10});
        setContent('');
        setImgBoxTog(false);
        setPostimage('');
      }
      else{
        alert("실패");
      }
      // window.location.replace("/")
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
                <img className="shareProfileImg" src={image} alt=""/> 
                {/* <input className="shareInput" placeholder="게시글을 입력해주세요." onChange={getContent} /> */}
                <textarea id="text-area" className="shareInput" placeholder="게시글을 입력해주세요." onChange={getContent} onKeyDown={autoResizeTextarea} onKeyUp={autoResizeTextarea} value={content} />
              </div>
              <div className={`shareImgBox ${imgBoxTog ? "": "displaynone" }`}> 
                <img id="upload-img" alt="face"></img>
                <div>
                <button className="deleteButton" onClick={deleteImg}>❌</button>
                </div>
              </div>
              <hr className="shareHr"/>
              <div className="shareBottom">
                  <div className="shareOptions">
                     <div className="shareOption"  onClick={()=> {selectFile.current.click()}}>  
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>   
                        <input type='file' id='fileInput' accept='img/*' style={{display:"none"}} ref={selectFile} onChange={onLoadFile}></input>  
                     </div>

                     <div className="shareOption" onClick={() => setShowPicker((val) => !val)} >
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText" >Emotions</span>
                        {showPicker && (
                          <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
                        )}
                     </div>
                     
                  </div>
                  
                    <button className="shareButton" onClick={Share}>등 록</button>
                    
              </div>
        
          </div>

        </div>
    )
}

export default Share;