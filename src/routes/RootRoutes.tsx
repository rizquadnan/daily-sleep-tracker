import { Heading } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Register, SplashScreen, NotFound } from 'pages'
import { ROUTES } from './constant'
import { ProtectedRoute } from './ProtectedRoute'
import { PageWrapper } from 'components'

export function RootRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.login}
        element={
          <PageWrapper>
            <Login />
          </PageWrapper>
        }
      />
      <Route
        path={ROUTES.register}
        element={
          <PageWrapper>
            <Register />
          </PageWrapper>
        }
      />
      <Route
        path={ROUTES.home}
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Home />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.splashScreen}
        element={
          <PageWrapper>
            <SplashScreen />
          </PageWrapper>
        }
      />
      <Route
        path="*"
        element={
          <PageWrapper>
            <NotFound />
          </PageWrapper>
        }
      />
    </Routes>
  )
}
