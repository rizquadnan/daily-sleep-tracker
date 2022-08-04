import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export function RootRoutes() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Splash Screen</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/" element={<h1>Splash Screen</h1>} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  )
}

export default RootRoutes
