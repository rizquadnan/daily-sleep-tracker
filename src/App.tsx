import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from 'providers'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { theme } from 'theme'
import { RootRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <SWRConfig>
          <AuthProvider>
            <RootRoutes />
          </AuthProvider>
        </SWRConfig>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
