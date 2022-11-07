import React, {useState} from "react";
import "./post.css";
import Comment from "./Comment";
const Post = ({post_id,user_image, nickname, content, image, like_count, date}) => {

    const [showComment, setShowComment] = useState(false);
    const handleClickButton = e => {
        // const { name } = e.target;
        setShowComment((e) => !e);
    };

    const likeHandler = (index) => {
        console.log(index);
    };
    const betweenTime = (value) =>{
        const date_at=new Date(value);
        const date_now=new Date();
        const date=Math.floor((date_now.getTime() - date_at.getTime())/1000/60);
        if(date < 1) return '방금전';
        if(date <60) return `${date}분전`;
        const betweenTimeHour = Math.floor(date/60);
        if(betweenTimeHour<24) return `${betweenTimeHour}시간전`;
        const betweenTimeDay = Math.floor(betweenTimeHour/60/24);
        if(betweenTimeDay < 365) return `${betweenTimeDay}일전`;
        
        return `${Math.floor(betweenTimeDay / 365)}년전`;
    };

    return (
        <div className="post">    
            <div className="postWrapper">
                <div className="postTop">
                     <div className="postTopLeft">
                            <img className="postProfileImg" src={user_image} alt=""/>
                            <span className="postUsername">{nickname}</span>
                            <span className="postDate">{betweenTime(date)}</span>
                    </div>
                </div>

                <div className="postCenter">
                    <pre className="postText">{content}</pre>
                    <img className="postImg" src={image} alt="" />
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="img/like.png" onClick={()=>likeHandler()} alt=""/>
                        <img className="likeIcon" src="img/heart.png" onClick={()=>likeHandler()} alt=""/>
                        <span className="postLikeCounter">{like_count} people liked this</span>
                    </div>
                    <div className="postBottomRight" onClick={handleClickButton} >
                        <span className="postCommentText">댓글 </span>
                    </div>
                </div>
            </div> 
            {showComment && (
             <Comment post_id={post_id} />
             )}
        </div>
);
}

export default Post;