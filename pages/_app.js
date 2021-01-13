import '../styles/globals.css'
import Header from "../components/Header"
import {ChakraProvider, CSSReset, extendTheme} from "@chakra-ui/react"

const Input = {
    baseStyle:{
      background:"#ffffff"
    }
  }

const theme = extendTheme({
  styles:{
    global:{
      body: {
        bg:  "#f8f8f8" // #f8f8f8 #faf8e5?
      }
    }
  },
  components:{
    Input
}})

function MyApp({ Component, pageProps }) {
  return (
  <>
    <ChakraProvider theme={theme}>
      <Header /> 
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp
