import React, { useContext} from 'react'
import "../utils/feed.css";
import Share from "./share/Share.js";
import Post from "./Post/Post"
import { UseContext } from "../User/UserContextProvider";



const Feed = ({loadpage}) => {
    const {cookies} =useContext(UseContext);
    
    return (
        <div className="feed">
            <div className="feedWrapper">

             {/* <Header /> */}
             {
                cookies ? <Share/> : <p></p>
             }
             <Post loadpage={loadpage}/>
             {/* {Post.map((p)=> (
                 <Post post={p} key={p.id}/>
             ))} */}
             {/* <Paging /> */}
            </div>
        </div>
    )
}

export default Feed