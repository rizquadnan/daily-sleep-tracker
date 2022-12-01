import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from 'providers'
import { BrowserRouter } from 'react-router-dom'
import { theme } from 'theme'
import { RootRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <RootRoutes />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
