import React, {useContext, useEffect, useState} from "react";
import "./post.css";
import Pagination from "react-js-pagination";
import Paging from "./Paging.css"
// import {UseContext} from '../../User/UserContextProvider';
import Comment from "./Comment";
import Post from "./Post"

const PostList = ({post}) => {
    // const {user, setUsers} = useContext(UseContext);    // 마이페이지에 유저 판별하기위해서
    const [page, setPage] = useState(1);
    // const [post,setpost] =useState([]);
    const [like, setLike] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const offset = (page - 1) * 10;
    const [showComment, setShowComment] = useState(false);

    const handleClickButton = e => {
        setShowComment((e) => !e);
    };
    
    const handlePageChange = (page) => {
        setPage(page);
      //   console.log(page);
    };

    const likeHandler = (index) => {
    };
    // const betweenTime = (value) =>{
    //     const date_at=new Date(value);
    //     const date_now=new Date();

    //     const date=Math.floor((date_now.getTime() - date_at.getTime())/1000/60);
    //     if(date < 1) return '방금전';
    //     if(date <60) return `${date}분전`;
    //     const betweenTimeHour = Math.floor(date/60);
    //     if(betweenTimeHour<24) return `${betweenTimeHour}시간전`;
    //     const betweenTimeDay = Math.floor(betweenTimeHour/60/24);
    //     if(betweenTimeDay < 365) return `${betweenTimeDay}일전`;
        
    //     return `${Math.floor(betweenTimeDay / 365)}년전`;
    // };

    return (
        <div>
        {post
            .slice(offset, offset + 10)
            .map((el)=>(
                <div key={el.id}>
                <Post
                post_id={el.id}
                user_image={el.user_image}
                nickname={el.nickname}
                content={el.content} 
                image={el.image}
                like_count={el.like_count}
                date={el.date_at}
                comment_count={el.comment_count} />
            </div>
            ))}  
              <Pagination
                className="Paging"
                activePage={page} // 현재 페이지
                itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수 (10)
                totalItemsCount={post.length} // 총 아이템 갯수 // totalItemCount
                pageRangeDisplayed={10} // paginator의 페이지 범위
                prevPageText={"‹"} // "이전"을 나타낼 텍스트
                nextPageText={"›"} // "다음"을 나타낼 텍스트
                onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
         </div>
    )

};

export default PostList