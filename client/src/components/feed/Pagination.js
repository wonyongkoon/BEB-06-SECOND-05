import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = () => {
    const [page, setPage] = useState(1);
  
    const handlePageChange = (page) => {
      setPage(page);
      console.log(page);
    };
  
    return (
     <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수 (10)
        totalItemsCount={100} // 총 아이템 갯수 // totalItemCount
        pageRangeDisplayed={10} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
    );
  };
  
  export default Paging;