import {
  render,
  screen,
  ByRoleMatcher,
  ByRoleOptions,
} from '@testing-library/react'
import {
  MemoryRouter,
  BrowserRouter,
  MemoryRouterProps,
} from 'react-router-dom'
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

  describe('renders pages', () => {
    const setup = (
      route: MemoryRouterProps['initialEntries'],
      role: ByRoleMatcher,
      options?: ByRoleOptions,
    ) => {
      render(
        <MemoryRouter initialEntries={route}>
          <RootRoutes />
        </MemoryRouter>,
      )

      return screen.getByRole(role, options)
    }
    it('renders register page properly', () => {
      const pageHeading = setup([ROUTES.register], 'heading', {
        name: 'Register',
      })

      expect(pageHeading).toBeInTheDocument()
    })

    it('renders home page properly', () => {
      const pageHeading = setup([ROUTES.home], 'heading', {
        name: 'Home',
      })

      expect(pageHeading).toBeInTheDocument()
    })
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
