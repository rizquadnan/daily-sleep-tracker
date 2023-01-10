import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider, GuestModeProvider } from 'providers'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { theme } from 'theme'
import { RootRoutes } from './routes'
import { GlobalErrorBoundary } from 'components'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <SWRConfig>
          <GlobalErrorBoundary>
            <AuthProvider>
              <GuestModeProvider>
                <RootRoutes />
              </GuestModeProvider>
            </AuthProvider>
          </GlobalErrorBoundary>
        </SWRConfig>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
