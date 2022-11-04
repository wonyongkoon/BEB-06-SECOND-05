import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentList from "./CommentList"

const Comment = () => {

    const [userName] = useState('yoo');
    const [comment, setComment] = useState('');
    const [feedComments, setFeedComments] = useState([]);

    const post = e => {
        const copyFeedComments = [...feedComments];
        copyFeedComments.push(comment);
        setFeedComments(copyFeedComments);
        setComment('');
    };


    return (
        <div>
         {feedComments
         .map((commentArr, i) => {
             return (
         <div>
            <CommentList
                userName={userName}
                userComment={commentArr}
                key={i}
            />
            <input
            type="text"
            className="inputComment"
            placeholder="댓글 달기..."
            onChange={e => {
                setComment(e.target.value);
            }}
            value={comment}
        />
        <button
            type="button"
            className={
                comment.length > 0
                ? 'submitCommentActive'
                : 'submitCommentInactive'
            }
            onClick={post}
        >게시</button>
        </div>
         )
    })}

    </div>
)
}
export default Comment;