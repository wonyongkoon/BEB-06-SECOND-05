import { React , useState, useContext, useEffect} from 'react';
// import "./post.css";
import "./Comment.css";
import {UseContext} from '../../User/UserContextProvider';
import axios from 'axios';
// import dummyComment from './dummyComment';
import { AddComment } from '@material-ui/icons';

const Comment = ({post_id}) => {

    const {image, cookies} = useContext(UseContext);
    const [commentValue, setCommentValue] = useState('');
    const [commentBox, setCommentBox] = useState([]);
    const [refresh,setrefresh] = useState(0);

    useEffect(()=>{
      axios.post("http://localhost:5000/post/comment",{
        post_id:post_id
      },{withCredentials: true})
      .then((res)=>{
        if(res.status===200){
          const data=res.data.data;
          setCommentBox(data);
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refresh])

    const onChange = e => {
      setCommentValue(e.target.value);
    };

   const onSubmit = e => {
    if (commentValue === '') {
      return;
    }
    e.preventDefault();
    axios.post("http://localhost:5000/post/commentsave",{
        post_id:post_id,
        comment:commentValue,
        image:image,
      },
      {withCredentials: true})
      .then((res)=>{
        if(res.status===200){
          setrefresh(refresh+1);
        }

      })
      setCommentValue('');
    };

  return (
<div className="Comment">    
      <div className="comment_Wrapper">
            <div className="comment_Top">
       {/* {dummyComment
       .map(el => {
          return (
            <div className="postUsername" key={el.id}>
            <span className="postUsername">{el.name}</span>
            <span className="postDate">{el.comment}</span>
            </div>
          )})
          }; */}
      {commentBox.map(el => {
        return (
          <div className="comment_Comment" key={el.id} >
            <form className="comment_BottomLeft">
            <img className="comment_ProfileImg" src={el.image} alt=""/>
            <div className="comment2">
            <div className="commentUsername">{el.nickname}</div>
            <span className="commentComment">{el.comment}</span>
            </div>
            </form>
          </div>
        )})
         }
        </div>
    <div className={`comment_Bottom ${cookies ? '':'btn-none'}`} onSubmit={onSubmit}>
     <form className="comment_Bottom-container">
      <img className="comment_ProfileImg" src={image} alt=""/>
      <input
        type="text"
        placeholder="댓글 달기..."
        className="comment-input"
        value={commentValue}
        onChange={onChange}
      />
      <button className="commentButton" >
        <AddComment></AddComment>
        </button>
    </form>
    </div>
    </div>
    </div>

  );
};

export default Comment;