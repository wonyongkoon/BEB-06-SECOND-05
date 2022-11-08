// NFT 모아서 출력
import React from "react";
import { useState } from "react";
import Item from "./Item";
import Pagination from "react-js-pagination";
import "./ItemList.css"; 


const ItemList = ({nftdata, itemCount}) => {
  let totalItemCount =nftdata.length // 전체 아이템 갯수
  const [page, setPage] = useState(1); // 현제 페이지
  const offset = (page - 1) * itemCount; // 10 -1 * 10
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div className="itemList">
      <div className={`${itemCount === 10 ? 'itemListItem' : 'itemListItem_6'}`}>
        {
          // 선택한 테마가 all일 경우 전체아이템 출력 아닐시 선택한 아이템으로 필터 적용 후 출력
          nftdata.slice(offset, offset + itemCount).map((punk) => (
                  <div>
                    <Item
                      id={punk.id}
                      image={punk.img_url}
                      description={punk.description}
                      metadataurl={punk.metadata_url}
                      itemcount={itemCount}
                    />
                  </div>
              ))
        
        }
      </div>
      {/* 페이지네이션  */}
      <div className="page">
        <Pagination className="Pagination"
          activePage={page}
          // 현재 페이지
          itemsCountPerPage={itemCount}
          // 한 페이지랑 보여줄 아이템 갯수 (10)
          totalItemsCount={totalItemCount}
          // 총 아이템 갯수 // totalItemCount
          pageRangeDisplayed={10}
          // paginator의 페이지 범위
          prevPageText={" ‹ "}
          // "이전"을 나타낼 텍스트
          nextPageText={" › "}
          // "다음"을 나타낼 텍스트
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      </div>
    </div>
  );
};

export default ItemList;
