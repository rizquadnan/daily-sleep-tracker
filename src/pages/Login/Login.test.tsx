import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './Login'

describe('Login page', () => {
  it('render successfully', () => {
    render(
      <Router>
        <Login />
      </Router>,
    )

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
