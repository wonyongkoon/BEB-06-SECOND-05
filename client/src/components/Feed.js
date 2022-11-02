import React, { useContext} from 'react'
import "../utils/feed.css";
import Share from "./share/Share.js";
import Post from "./Post/Post"
import { UseContext } from "../User/UserContextProvider";



const Feed = () => {
    const {cookies} =useContext(UseContext);
    
    return (
        <div className="feed">
            <div className="feedWrapper">
                 {
                cookies ? <Share/> : <p></p>
             }
             <Post />
            </div>
        </div>
    )
}

export default Feed