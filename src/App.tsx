import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from 'theme'
import { RootRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <RootRoutes />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
