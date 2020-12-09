import { useState } from "react"
import Link from "next/link"
import { Box, Flex, Text, Button} from "@chakra-ui/react"
 
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
 
const MenuItems = (props) => {
  const { children, isLast, href = "/", ...rest } = props
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }} // might need to adjust breakpoints? sm should be spaced > 0 (around 8 too)
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link href={href}>{children}</Link>
    </Text>
  )
}
 
export default function Header (props){
  const [show, setShow] = useState(false)
  const toggleMenu = () => setShow(!show)
 
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["blue", "blue", "grey", "grey"]} // set colours of bg and text from base (mobile) upwards
      color={["black", "black", "primary.700", "primary.700"]}
      {...props}
    >
      <Flex align="center">
        <Text><Link href="/">Logo</Link></Text>
      </Flex>
 
      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>
 
      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "column", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
            <MenuItems href="/jobs">All Jobs</MenuItems>
            <MenuItems href="/post-job">Post Job</MenuItems>
            <MenuItems href="/about">About</MenuItems>
            <MenuItems href="/contact">Contact Us</MenuItems>
            <MenuItems href="/login">Login</MenuItems>
            <MenuItems href="/signup">Sign Up</MenuItems>
            
        </Flex>
      </Box>
    </Flex>
  )
}