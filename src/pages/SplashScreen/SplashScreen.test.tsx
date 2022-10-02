import { render, screen } from '@testing-library/react'
import SplashScreen from './SplashScreen'

describe('<SplashScreen />', () => {
  it('renders succesfully', () => {
    render(<SplashScreen />)

    expect(
      screen.getByRole('heading', { name: /welcome to daily sleep tracker/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /register/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })
})
