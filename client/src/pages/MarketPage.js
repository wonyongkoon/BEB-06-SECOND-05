import React, {useEffect, useState } from 'react'
import '../utils/marketpage.css'
import ItemList from '../components/market/ItemList'
import searchIcon from '../icon/search.png'
import axios from 'axios'
const MarketPage = () => {
    // 임시로 더미데이터 사용 DB 연결시 방안 생각하기
    //
    const[nftdata,setnftdata] = useState(null);
    useEffect(()=>{
        axios.post("http://localhost:5000/nft/nftall",{withCredentials: true})
        .then((res)=>{
            setnftdata(res.data)
        })
    },[])
   
    return (
        <div className='MarketPage'>
            <div className='MarketPage__hearder'>
            MARKETPLACE
            </div>
            <div className='searchBar'>
                <div className='searchIconContainer'>
                    <img src={searchIcon} alt='img'/>
                </div>
                <input
                    className='searchInput'
                    placeholder='Search items, collections, and accounts'></input>
            </div>
            {
                nftdata ==null?<p></p>:<ItemList itemCount={10} nftdata={nftdata} />
            }
            
        </div>

    )
}

export default MarketPage