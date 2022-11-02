import React from "react";
import "../utils/feed.css";
import Share from "./share/Share.js";
import Post from "./Post/Post"



const Feed = () => {
    return (
        <div className="feed">
            <div className="feedWrapper">
             <Share />
             <Post />
            </div>
        </div>
    )
}

export default Feed