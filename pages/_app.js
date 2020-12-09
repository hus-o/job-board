import '../styles/globals.css'
//import Navbar from "../components/Navbar"
import Header from "../components/Header"
import {ChakraProvider, CSSReset} from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  return (
  <>
    <ChakraProvider>
      <Header />  {/* should this be above provider or within? */}
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp
