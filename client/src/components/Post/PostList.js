import React, {useState} from "react";
import "./post.css";
import Pagination from "react-js-pagination";
import "./Paging.css"
// import {UseContext} from '../../User/UserContextProvider';
import Post from "./Post"

const PostList = ({post}) => {
    // const {user, setUsers} = useContext(UseContext);    // 마이페이지에 유저 판별하기위해서
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    // const [post,setpost] =useState([]);
    // const [like, setLike] = useState();
    // const [isLiked, setIsLiked] = useState(false);


    // const [showComment, setShowComment] = useState(false);

    // const handleClickButton = e => {
    //     setShowComment((e) => !e);
    // };

    // const likeHandler = (index) => {
    // };
    
    const handlePageChange = (page) => {
        setPage(page);
      //   console.log(page);
    };



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
                date={el.date_at} />
            </div>
            ))}  
              <Pagination
                className="Pagination"
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