import { Heading, Link, Wrap } from '@chakra-ui/react'
import { Routes, Route, Link as RouterLink } from 'react-router-dom'
import { Home, Login, Register, SplashScreen } from 'pages'
import { ROUTES } from './constant'
import { ProtectedRoute } from './ProtectedRoute'

export function RootRoutes() {
  return (
    <div>
      <nav>
        <Wrap as="ul" position="fixed" top="0" left="0">
          <li>
            <Link as={RouterLink} to={ROUTES.splashScreen}>
              Splash Screen
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to={ROUTES.login}>
              Login
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to={ROUTES.register}>
              Register
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to={ROUTES.home}>
              Home
            </Link>
          </li>
        </Wrap>
      </nav>

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
    </div>
  )
}
