import React from "react";
import "../utils/feed.css";
import Share from "./share/Share.js";
import Post from "./Post/Post"



const Feed = () => {
    return (
        <div className="feed">
            <div className="feedWrapper">

             {/* <Header /> */}
             <Share />
             <Post />
             {/* {Post.map((p)=> (
                 <Post post={p} key={p.id}/>
             ))} */}
             {/* <Paging /> */}
            </div>
        </div>
    )
}

export default Feed