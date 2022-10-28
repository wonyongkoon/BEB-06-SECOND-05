import React, {useState} from "react";
import "../../utils/post.css";
import {MoreVert} from "@material-ui/icons";
import {Users} from "../data";


const Post = ({post}) => {
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        setLike(isLiked ? like+1 : like)
        setIsLiked(!isLiked)
    };

    const hateHandler = () => {
        setLike(isLiked ? like-1 : like)
        setIsLiked(!isLiked)
    };

    return (
         <div className="post">
             
              <div className="postWrapper">
    
                    <div className="postTop">

                          <div className="postTopLeft">
                                <span className="postUsername">{Users.filter((u) => u.id === post?.user_Id)[0].username}</span>
                                <span className="postUserNickname">{Users.filter((u) => u.id === post?.user_Id)[0].nickname}</span>
                          </div>

                          <div className="postTopRight">
                                <span className="postDate">{post.date_at}</span>
                          </div>

                    </div>

                    <div className="postCenter">
                         <div className="postTitle">{post?.title}</div>
                         <div className="postText">{post?.content}</div>
                         <img className="postImg" src={post.photo} alt="" />
                    </div>

                    <div className="postBottom">

                        <div className="postBottomLeft">
                            <img className="likeIcon" src="img/heart.png" onClick={likeHandler} alt=""/>
                            <img className="hateIcon" src="img/hate.png" onClick={hateHandler} alt=""/>
                            <span className="postLikeCounter">{like} people liked this</span>
                        </div>

                        <div className="postBottomRight">
                            <span className="postCommentText">{post.comment} comments</span>
                        </div>

                    </div>

              </div>

         </div>
    )

};

export default Post