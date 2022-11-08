// NFT 각각의 항목
import React from 'react'
import weth from '../../icon/weth.png'
import './Item.css'
import {useState, useContext} from 'react'
import { UseContext } from '../../User/UserContextProvider'
import Modal from 'react-modal';
import Popup from '../Popup'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const Item = ({id,image,description,metadataurl ,itemcount}) => {
    // NFT 구매하기 모달창 열림
    const {user} = useContext(UseContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const {setUsers, setCookiesHandler} =useContext(UseContext);
    const navigator = useNavigate();
    const SellModal = () => {
        setModalIsOpen(true)
    }
    const Sell = () =>{
        axios
        .post("http://localhost:5000/mintNFT/mintNFT", {
	        fromAddress : user.address,
	        tokenURI : metadataurl
        }, {withCredentials: true})
        .then(function (response) {
            if(response.status===200){
                setUsers({...user,token_amount:user.token_amount-10});
                setCookiesHandler(true);
                setPopup({
                       open:true,
                       message: "구매 되었습니다.", 
                       callback: function(){
                            navigator("/mypage")} });
                            // 구매 성공시 마이페이지로 이동
            } else {
                alert("실패");
            }
            
        })
        .catch((Error) => {
            console.log("실패")
            console.log(Error);
        })
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      
    return (
        // 마이페이지와 마켓 페이지의 배열을 다르게 하기 위해서 10개일경우 마켓, 아닐경우 마이페이지로 구현
        itemcount === 10 ? 
        <div className='item-component'>
            <div className='item-hover'>
                <div className='item-component__item'>
                    <img className='item-component__image' src={image} alt='img'/>
                    <div className='item-component__datails'>
                        <div className='name'>
                            아이유
                            <div className='id'>
                                •#{id}</div>
                        </div>
                    </div>
                    <div className='item-component__price-container'>
                        <img src={weth} className='wethImage' alt='img'/>
                        <div className='peice'>10 EIT</div>
                    </div>
                </div>
                <div className='sell-container'>
                <button className='sell-container__btn sell-container__btn-size' onClick={SellModal}>구매하기</button>
                </div>
            </div>
            <Modal style={customStyles}  isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                    <div className='Modal'>
                        <div className='NFT_img '>
                            <img className='NFT_img-img' src={image} alt='img'/>
                        </div>
                        <div className='NFT_metadata '>
                            <div className='NFT_metadata-name '> {`아이유 ${id}`} </div>
                            {/* 눌렀을대 해당 데이터를 바로 가져오므로 그냥 {name}, {image} 이런식으로 구현하면 됨 (DB랑 매칭은 필요) */}
                            <div className='NFT_metadata-description'> {description}</div>
                            <div className='item-component__price-container'>
                                <img src={weth} className='wethImage2' alt='img'/>
                                <div className='price2'>10 EIT</div>
                            </div>
                            <div className='sell-btn'>
                                <button className='sell-container__btn btn-size' onClick={Sell} > 구매하기 </button>
                            </div>
                        </div>
                    </div>
                    <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}/>
                </Modal>
        </div>
        :
        <div className='item-component_6'>
        <div className='item-hover_6'>
            <div className='item-component__item_6'>
                <img className='item-component__image_6' src={image} alt='img'/>
                <div className='item-component__datails_6'>
                    <div className='name_6'>
                        아이유
                        <div className='id_6'>
                            •#{id}</div>
                    </div>
                </div>
                <div className='item-component__price-container_6'>
                    <img src={weth} className='wethImage_6' alt='img'/>
                    <div className='peice_6'>10 EIT</div>
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