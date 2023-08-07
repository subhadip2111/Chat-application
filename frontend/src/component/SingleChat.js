import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender,getSenderFull } from '../config/ChatLogics'
import ProfileModal from './miscellanious/profileModal'
import UpdateGroupChatModal from './miscellanious/UpdateGroupChatModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    
    const{user,selectedChat,setSelectedChat}= ChatState()
  return (
    <>
          {selectedChat ? (<>

              <Text    fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center">
                  
 <IconButton
                      d={{ base: "flex", md: "none" }}
                      marginLeft="-30%" 
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
                  />
                  

                  {!selectedChat.isGroupChat ? (<>
                      
                      {getSender(user, selectedChat.users)}
                      
                      <ProfileModal  user= {getSenderFull(user, selectedChat.users)}/>
                  </>) : (
                      


                      <>  {selectedChat.chatName.toUpperCase()}
                      
                          <UpdateGroupChatModal fetchAgain={ fetchAgain} setFetchAgain={setFetchAgain} />
                      
                      </>)}
                  


</Text>
              <Box d="flex"
                  justifyContent="flex-end"
                  p={3}
                  bg="#E8E8E8"
                  w="100%"
                  h="90%"
                  borderRadius="1g"
                  overflow='hidden'
              
              >
                  

           </Box>   
          </>) : (
              

              <Box d='flex' alignItems='center' justifyContent="center" h='100%'>
                  <Text fontSize="3xl" pb={3} fontFamily="Work sans"> Click on a user to start a message</Text>
              </Box>
     )}
    </>
  )
}

export default SingleChat
