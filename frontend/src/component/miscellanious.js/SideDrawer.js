import { Box, Button, Menu, MenuButton, MenuList, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';

import { BellIcon ,ChevronDownIcon} from "@chakra-ui/icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SideDrawer = () => {


const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);



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
                  
                  <Button variant='ghost'><FontAwesomeIcon icon={faSearch} />
                      <Text d={{base:"none" ,md:"flex"}} px="4">
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
                      
                      
                          
                          <BellIcon   fontSize="2xl"
        position="absolute"
        top="10"
       right="25"                 
                       />
                      
                      </MenuButton>


                      {/* <MenuList></MenuList>  */}
                      
                  </Menu>
                  <Menu>
                      
                       <MenuButton  position="absolute"
        top="7"
        right="20"  as={Button} rightIcon={<ChevronDownIcon/>}>
                      
                      gdg
                      </MenuButton>
                  </Menu>
              </div>


          </Box>
   </>
  )
}

export default SideDrawer
