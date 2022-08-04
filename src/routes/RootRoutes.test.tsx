import { render, screen } from '@testing-library/react'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import App from '../App'
import { ROUTES } from './constant'
import { RootRoutes } from './RootRoutes'

describe('<RootRoutes />', () => {
  it('renders default page properly', () => {
    render(<RootRoutes />, { wrapper: BrowserRouter })
    const defaultPageHeading = screen.getByRole('heading', {
      name: 'Splash Screen',
    })
    expect(defaultPageHeading).toBeInTheDocument()
  })

  it('renders register page properly', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.register]}>
        <RootRoutes />
      </MemoryRouter>,
    )

    const pageHeading = screen.getByRole('heading', {
      name: 'Register',
    })
    expect(pageHeading).toBeInTheDocument()
  })

  it('renders not found page when detects a unidentified route', () => {
    const unidentifiedRoute = '/lol/this-is-not-going-to-work'

    render(
      <MemoryRouter initialEntries={[unidentifiedRoute]}>
        <RootRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Not found' }),
    ).toBeInTheDocument()
  })
})
