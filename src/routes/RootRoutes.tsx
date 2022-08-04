import { Heading, Link } from '@chakra-ui/react'
import { Routes, Route, Link as RouterLink } from 'react-router-dom'

export function RootRoutes() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link as={RouterLink} to="/">
              Splash Screen
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to="/home">
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Heading>Login</Heading>} />
        <Route path="/home" element={<Heading>Home</Heading>} />
        <Route path="/" element={<Heading>Splash Screen</Heading>} />
        <Route path="*" element={<Heading>Not found</Heading>} />
      </Routes>
    </div>
  )
}

export default RootRoutes
