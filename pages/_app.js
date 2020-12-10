import '../styles/globals.css'
//import Navbar from "../components/Navbar"
import Header from "../components/Header"
import {ChakraProvider, CSSReset, extendTheme} from "@chakra-ui/react"

const theme = extendTheme({
  styles:{
    global:{
      body: {
    bg:  "#faf8e5"
  }
  }}})

function MyApp({ Component, pageProps }) {
  return (
  <>
    <ChakraProvider theme={theme}>
      <Header />  {/* should this be above provider or within? */}
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp
