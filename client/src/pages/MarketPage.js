import React from 'react'
import '../utils/marketpage.css'
import ItemList from '../components/market/ItemList'
import dummy from '../components/market/dummy'
import searchIcon from '../icon/search.png'
const MarketPage = () => {
    // 임시로 더미데이터 사용 DB 연결시 방안 생각하기
    //
    return (
        <div className='MarketPage'>
            <div className='MarketPage__hearder'>
            MARKETPLACE
            </div>
            <div className='searchBar'>
                <div className='searchIconContainer'>
                    <img src={searchIcon}/>
                </div>
                <input
                    className='searchInput'
                    placeholder='Search items, collections, and accounts'></input>
            </div>

            <ItemList getItem={{dummy}} itemCount={10} />
        </div>

    )
}

export default MarketPage