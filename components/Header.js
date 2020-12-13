import { useState } from "react"
import Link from "next/link"
import { Box, Flex, Text, Button, useColorMode} from "@chakra-ui/react"
 
import { CloseIcon, HamburgerIcon, SunIcon, MoonIcon} from "@chakra-ui/icons"
 
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
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["#faf8e5", "#faf8e5", "#faf8e5", "#faf8e5"]} // set colours of bg and text from base (mobile) upwards
      color={["#2c2c2e", "#2c2c2e", "#2c2c2e", "#2c2c2e"]}
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
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
            <MenuItems href="/jobs">All Jobs</MenuItems>
            <MenuItems href="/post-job">Post Job</MenuItems>
            <MenuItems href="/about">About</MenuItems>
            <MenuItems href="/contact">Contact Us</MenuItems>
            <MenuItems href="/login">Login</MenuItems>
            <MenuItems href="/signup" isLast>
            <Button
              size="sm"
              rounded="md"
              color={["black", "black", "black", "black"]}
              bg={["#E5E7FA", "#E5E7FA", "#E5E7FA", "#E5E7FA"]}
              _hover={{
                bg: [
                  "#8e97e9",
                  "#8e97e9",
                  "#8e97e9",
                  "#8e97e9",
                ],
              }}
            >
              Sign Up
            </Button>
            </MenuItems>
        </Flex>
      </Box>
    </Flex>
  )
}