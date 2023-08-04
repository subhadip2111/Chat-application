import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const { createContext, useContext, useState } = require("react");

const ChatContext = createContext()

const ChatProvider = ({children}) => {
   const history=useHistory()
    
const [user,setUser]=useState()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if (!userInfo) {
    history.push("/")
}

},[history])
    return (
        <ChatContext.Provider value={{user,setUser}}> { children}</ChatContext.Provider>
)

}
export const ChatState = () => {
   return    useContext(ChatContext)

 }


export default ChatProvider