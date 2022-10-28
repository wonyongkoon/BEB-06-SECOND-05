import React from "react";
import "../utils/feed.css";
import Header from "./feed/header2";
import Post from "./feed/Post"
import Sort from "./feed/sort"
import {Posts} from "./data"

const Feed = () => {
    return (
        <div className="feed">
          <div className="feed_sort">
             <Sort />
          </div>
            <div className="feedWrapper">
             <Header />
             {Posts.map((p)=> (
                 <Post post={p} key={p.id}/>
             ))}

            </div>
        </div>
    )
}

export default Feed