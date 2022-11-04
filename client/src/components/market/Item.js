// NFT 각각의 항목
import React from 'react'
import weth from '../../icon/weth.png'
import './Item.css'

const Item = ({id,image, itemcount}) => {
    
    return (
        // 마이페이지와 마켓 페이지의 배열을 다르게 하기 위해서 10개일경우 마켓, 아닐경우 마이페이지로 구현
        itemcount == 10 ? 
        <div className='item-component'>
            <div className='item-hover'>
                <div className='item-component__item'>
                    <img className='item-component__image' src={image}/>
                    <div className='item-component__datails'>
                        <div className='name'>
                            아이유
                            <div className='id'>
                                •#{id}</div>
                        </div>
                    </div>
                    <div className='item-component__price-container'>
                        <img src={weth} className='wethImage'/>
                        <div className='peice'>10 EIV</div>
                    </div>
                </div>
                <div className='sell-container'>
                    <button className='sell-container__btn'>구매하기</button>
                </div>
            </div>
        </div>
        :
        <div className='item-component_6'>
        <div className='item-hover_6'>
            <div className='item-component__item_6'>
                <img className='item-component__image_6' src={image}/>
                <div className='item-component__datails_6'>
                    <div className='name_6'>
                        아이유
                        <div className='id_6'>
                            •#{id}</div>
                    </div>
                </div>
                <div className='item-component__price-container_6'>
                    <img src={weth} className='wethImage_6'/>
                    <div className='peice_6'>10 EIV</div>
                </div>
            </div>
            <div className='sell-container_6'>
                <button className='sell-container__btn_6'>구매하기</button>
            </div>
        </div>
    </div>


    )
}

export default Item