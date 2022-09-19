import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'

describe('Home page', () => {
  it('renders successfully', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByTestId('chart')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /new entry/i }),
    ).toBeInTheDocument()
  })
  describe('Create functionality', () => {
    test('create modal not exists initially', () => {
      render(<Home />)

      const modalBanner = screen.queryByText(/add sleep data/i)
      expect(modalBanner).not.toBeInTheDocument()
    })
    test('click add entry shows create modal', async () => {
      const user = userEvent.setup()
      render(<Home />)

      await user.click(screen.getByRole('button', { name: /new entry/i }))

      const modalBanner = screen.getByText(/add sleep data/i)
      expect(modalBanner).toBeInTheDocument()
    })
  })

  describe('Edit functionality', () => {
    test('create modal not exists initially', () => {
      render(<Home />)

      const modalBanner = screen.queryByText(/edit sleep data/i)
      expect(modalBanner).not.toBeInTheDocument()
    })
    test('click edit entry shows edit modal', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const row = screen.getByRole('row', {
        name: /13\/12\/21 22:00 05:00 07:00/i,
      })
      const button = within(row).getByRole('button', {
        name: /edit row/i,
      })

      await user.click(button)

      const modalBanner = screen.getByText(/edit sleep data/i)
      expect(modalBanner).toBeInTheDocument()
    })
  })
})
