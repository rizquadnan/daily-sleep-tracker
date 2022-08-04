import { Button, ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { RootRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <RootRoutes />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
