import React, { createContext,useState } from "react";
// import logo from '../icon/logo.txt'
export const UseContext = createContext({
    cookies:false,
    user:{
        user_id:"",
        nickname:"",
        email:"",
        address:"",
        token_amount:"",
        eth_amount:"",
        mynft:"",
    },
    image:"",
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
        mynft:"",
    });
    const [image,setImage] =useState("");

    const setConfirmHandler = (bool)=> setCookies(bool);
    const setUserHandler= (data)=> setUser(data);
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