import { Heading } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Register, SplashScreen } from 'pages'
import { ROUTES } from './constant'
import { ProtectedRoute } from './ProtectedRoute'

export function RootRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.register} element={<Register />} />
      <Route
        path={ROUTES.home}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.splashScreen} element={<SplashScreen />} />
      <Route path="*" element={<Heading>Not found</Heading>} />
    </Routes>
  )
}
