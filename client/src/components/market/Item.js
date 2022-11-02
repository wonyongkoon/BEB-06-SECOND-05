// NFT 각각의 항목
import React from 'react'
import weth from '../../icon/weth.png'
import './Item.css'
// import './mypageItem.css'
// import '../asset/Item2.css'  테스트 중

const Item = ({id, name, price, image, itemcount}) => {
    console.log(itemcount)
    return (
        // <div className='item-component'>     <img className='item-component__image'
        // src={image}/>     <div className='item-component__name'>         {name}#{id}
        // </div>     <div className='item-component__writer'>         {writer} </div>
        // <div className='item-component__price-container'>         <img src={weth}
        // className='wethImage'/>         <div className='peice'>{price}</div> </div>
        // </div>
        itemcount == 10 ? 
        <div className='item-component'>
            <div className='item-hover'>
                <div className='item-component__item'>
                    <img className='item-component__image' src={image}/>
                    <div className='item-component__datails'>
                        <div className='name'>
                            {name}
                            <div className='id'>
                                •#{id}</div>
                        </div>
                    </div>
                    <div className='item-component__price-container'>
                        <img src={weth} className='wethImage'/>
                        <div className='peice'>{price}</div>
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
                        {name}
                        <div className='id_6'>
                            •#{id}</div>
                    </div>
                </div>
                <div className='item-component__price-container_6'>
                    <img src={weth} className='wethImage_6'/>
                    <div className='peice_6'>{price}</div>
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