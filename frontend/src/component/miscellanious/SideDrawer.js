import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChatState } from '../../Context/ChatProvider';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileModal from "./profileModal.js"
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';




const SideDrawer = () => {

    const history = useHistory()
    const logouthandler = () => {
        localStorage.removeItem("userInfo")
        history.push("/")
    }
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { user ,setSelectedChat,slectedChat,chats,setChats} = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()


    const toast=useToast()
    const handleSearch =async () => {
        if (!search) {
          toast({
        title: " Please Enter something for Search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
          }); 
            return;
        }
try {
    
    setLoading(true)
    const config = {
        headers: {
            Authorization:`Bearer ${user.token}`
        }
    }
const {data}=await axios.get(`/api/user?search=${search}`,config )

    setLoading(false) 
    setSearchResult(data)
    
} catch (error) {
   
    toast({
        title: " Error Occured!",
        description:'Failed to Load the Search Result',
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
          });

}



    }

    const accessChat = async(userId) => {
        try {
            setLoading(true)

            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${user.token}`
                }

                
            };



const {data}=await axios.post("/api/chat", {userId},config)
  if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data)
            setLoading(false) 
      onClose()      
            
        } catch (error) {
            
 toast({
        title: " Error Fetching  chat",
        description:error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
          });

        }
    }
    return (
        <>
            <Box d="flex"
                justifyContent='space-between'
                alignItems='center'
                bg='white'
                w='100%'
                p='5px 10px 5px 10px'
                borderWidth='5px'

            >
                <Tooltip label='Search User to Chat' hasArrow placement='bottom-end'>

                    <Button variant='ghost' onClick={onOpen}><FontAwesomeIcon icon={faSearch} />
                        <Text d={{ base: "none", md: "flex" }} px="4">
                            Seach User
                        </Text>

                    </Button>

                </Tooltip>

                <Text fontSize='1.5xl'
                    fontFamily='Work sans'
                    ml='40%' > TALk-A-LIVE</Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>



                            <BellIcon fontSize="2xl"
                                position="absolute"
                                top="10"
                                right="25"
                            />

                        </MenuButton>


                        {/* <MenuList></MenuList>  */}

                    </Menu>
                    <Menu>

                        <MenuButton position="absolute"
                            top="7"
                            right="20" as={Button} rightIcon={<ChevronDownIcon />}>

                            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
                        </MenuButton>

                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem> Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logouthandler}> Logout</MenuItem>
                        </MenuList>

                    </Menu>
                </div>


            </Box>


            <Drawer placement='left' onClose={onClose}

                onOpen={onOpen} isOpen={isOpen}

            >
                <DrawerOverlay />
                <DrawerContent >
                    <DrawerHeader borderBottomWidth='1px'> Search User</DrawerHeader>


                    <DrawerBody><Box d='flex' pb={2}>

                        <Input placeholder='Search User by Email' value={search} mr={2}  onChange={(e) => setSearch(e.target.value)} />
                        <Button
                        onClick={handleSearch}
                        >
                            Go</Button>
                    </Box>
                    
                     {loading ? (
              <ChatLoading/>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
                    {loadingChat && <Spinner ml ="auto" d="flex"/>}
                    </DrawerBody>
                </DrawerContent>

            </Drawer>



        </>
    )
}


export default SideDrawer