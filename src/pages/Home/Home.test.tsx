import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'

describe('Home page', () => {
  it('renders successfully', () => {
    render(<Home />)

    expect(screen.getByRole('tab', { name: /chart/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /table/i })).toBeInTheDocument()
    expect(
      screen.getByRole('tab', { name: /side by side/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /new entry/i }),
    ).toBeInTheDocument()
  })

  test('tab functionality', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const selectors = {
      chartSingularTestId: 'chart-singular',
      tableRole: 'table',
      chartSideBySideTestId: 'chart-side-by-side',
    }

    expect(screen.getByTestId(selectors.chartSingularTestId)).toBeVisible()
    expect(screen.queryByRole(selectors.tableRole)).not.toBeInTheDocument()
    expect(
      screen.queryByTestId(selectors.chartSideBySideTestId),
    ).not.toBeInTheDocument()

    const chartTab = screen.getByRole('tab', { name: /chart/i })
    const tableTab = screen.getByRole('tab', { name: /table/i })
    const sideBySideTab = screen.getByRole('tab', { name: /side by side/i })

    await user.click(tableTab)
    await waitFor(() => {
      expect(
        screen.queryByTestId(selectors.chartSideBySideTestId),
      ).not.toBeInTheDocument()
    })
    expect(await screen.findByRole(selectors.tableRole)).toBeVisible()
    expect(
      screen.queryByTestId(selectors.chartSideBySideTestId),
    ).not.toBeInTheDocument()

    await user.click(chartTab)
    expect(
      await screen.findByTestId(selectors.chartSingularTestId),
    ).toBeVisible()
    await waitFor(() => {
      expect(screen.queryByRole(selectors.tableRole)).not.toBeInTheDocument()
    })
    expect(
      screen.queryByTestId(selectors.chartSideBySideTestId),
    ).not.toBeInTheDocument()

    await user.click(sideBySideTab)
    await waitFor(() => {
      expect(
        screen.queryByTestId(selectors.chartSingularTestId),
      ).not.toBeInTheDocument()
    })
    expect(await screen.findByRole('table')).toBeVisible()
    expect(
      await screen.findByTestId(selectors.chartSideBySideTestId),
    ).toBeVisible()
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
})
