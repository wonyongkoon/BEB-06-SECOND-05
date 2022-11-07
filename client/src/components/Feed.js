import React, {useContext, useEffect, useState} from "react";
import "../utils/feed.css";
import Share from "./share/Share.js";
import PostList from "./Post/PostList"
import axios from 'axios'
// import Comment from './Post/Comment.js';
import { UseContext } from "../User/UserContextProvider";



const Feed = ({loadpage}) => {
    const {cookies} =useContext(UseContext);
    const {user, setUsers} = useContext(UseContext);
    const [post,setpost] =useState([]);

    useEffect(()=> {
        axios.post("http://localhost:5000/post/postall",{withCredentials: true})
        .then((response) =>{
            loadpage !== "MyPage" ? 
           setpost(response.data) :
           setpost(response.data.filter((el) => el.user_id == user.user_id)); 
        })
    }, [user])
    
    return (
        <div className="feed">
            <div className="feedWrapper">

             {/* <Header /> */}
             {/* <Comment/> */}
             {
                cookies ? <Share/> : <p></p>
             }
             <PostList loadpage={loadpage} post={post}/>
             {/* {Post.map((p)=> (
                 <Post post={p} key={p.id}/>
             ))} */}
             {/* <Paging /> */}
            </div>
        </div>
    )
}

export default Feed