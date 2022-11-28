import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Register from './Register'

describe('Register page', () => {
  it('render successfully', () => {
    render(
      <Router>
        <Register />
      </Router>,
    )

    expect(
      screen.getByRole('heading', { name: /register/i }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
