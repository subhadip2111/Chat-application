import { Container,Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../component/Authentication/Login'
import SignUp from '../component/Authentication/SignUp'
const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box d='flex'
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius='1g'
        borderWidth="1px"
      >
<Text fontSize="4xl" fontFamily="Work sans" color="black">LETS'S CHAT </Text>

      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px" color="black"><Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab w="50%">Login</Tab>
    <Tab w="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Login/>
    </TabPanel>
    <TabPanel>
     <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs> </Box>
  </Container>
  )
}

export default HomePage
