import { render, screen } from '@testing-library/react'
import Register from './Register'

describe('Register page', () => {
  it('render successfully', () => {
    render(<Register />)

    expect(
      screen.getByRole('heading', { name: /register/i }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
