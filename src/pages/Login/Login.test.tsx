import { render, screen } from '@testing-library/react'
import Login from './Login'

describe('Login page', () => {
  it('render successfully', () => {
    render(<Login />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
