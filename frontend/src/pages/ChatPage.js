import React, {  useState } from 'react'
//import axios from "axios"
import { ChatState } from '../Context/ChatProvider'
import {  Flex  } from '@chakra-ui/react'
import SideDrawer from '../component/miscellanious/SideDrawer'
import MyChats from '../component/miscellanious/MyChats'
import ChatBox from '../component/miscellanious/ChatBox'




const ChatPage = () => {

  const { user } = ChatState()
  
const [fetchAgain,setFetchAgain]=useState(false)

  return (
    <div style={{width:"100%"}}>
      {
        user && <SideDrawer/>
      }

  <Flex
      d="flex"
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px"
    >
        {user && <MyChats fetchAgain={fetchAgain} />}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain = {setFetchAgain}/>}
    </Flex>
 </div>
  )
}

export default ChatPage









