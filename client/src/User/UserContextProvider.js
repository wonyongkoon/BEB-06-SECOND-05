import React, { createContext,useState } from "react";

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
    setUsers:() =>{},
    setCookiesHandler:() => {},
});

const UserContextProvider=({children})=>{
    const [cookies,setCookies] =useState(false);
    const [user,setUser] = useState({
        user_id:"",
        nickname:"",
        email:"",
        address:"",
        token_amount:"",
        eth_amount:""
    });

    const setConfirmHandler = (bool)=> setCookies(bool);
    const setUserHandler= (data)=> setUser(data);
    const usercontext={
        cookies:cookies,
        user:user,
        setUsers:setUserHandler,
        setCookiesHandler:setConfirmHandler
    }

    return(
        <UseContext.Provider value={usercontext}>
            {children}
        </UseContext.Provider>
    );
};

export default UserContextProvider;