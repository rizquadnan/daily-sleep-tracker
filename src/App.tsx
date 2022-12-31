import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider, GuestModeProvider } from 'providers'
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
            <GuestModeProvider>
              <RootRoutes />
            </GuestModeProvider>
          </AuthProvider>
        </SWRConfig>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
