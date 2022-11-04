import React, { createContext,useState } from "react";
import logo from '../icon/logo.txt'
export const UseContext = createContext({
    cookies:false,
    user:{
        user_id:"",
        nickname:"",
        email:"",
        address:"",
        token_amount:"",
        eth_amount:""
    },
    image:logo,
    setUsers:() =>{},
    setCookiesHandler:() => {},
    setUserImage:()=>{},
});

const UserContextProvider=({children})=>{
    const [cookies,setCookies] =useState(false);
    const [user,setUser] = useState({
        user_id:"",
        nickname:"",
        email:"",
        address:"",
        token_amount:"",
        eth_amount:"",
    });
    const [image,setImage] =useState("");

    const setConfirmHandler = (bool)=> setCookies(bool);
    const setUserHandler= (data)=> setUser({
        ...user,
        user_id:data.user_id,
        nickname:data.nickname,
        email:data.email,
        address:data.address,
        token_amount:data.token_amount,
        eth_amount:data.eth_amount,   
    });
    const setUserImgeHandler = (data)=> setImage(data);
    const usercontext={
        cookies:cookies,
        user:user,
        image:image,
        setUsers:setUserHandler,
        setCookiesHandler:setConfirmHandler,
        setUserImage:setUserImgeHandler
    }

    return(
        <UseContext.Provider value={usercontext}>
            {children}
        </UseContext.Provider>
    );
};

export default UserContextProvider;