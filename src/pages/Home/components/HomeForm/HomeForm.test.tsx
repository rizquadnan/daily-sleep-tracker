import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  SLEEP_END,
  SLEEP_END_ERROR,
  SLEEP_END_INPUT,
  SLEEP_START,
  SLEEP_START_ERROR,
  SLEEP_START_INPUT,
  SUBMIT_INPUT,
} from './constants'
import HomeForm, { HomeFormProps } from './HomeForm'

describe('<HomeForm />', () => {
  const mockOnSubmit = jest.fn()
  const defaultProps: HomeFormProps = {
    onSubmit: mockOnSubmit,
  }

  it('has input sleep start', () => {
    render(<HomeForm {...defaultProps} />)

    expect(screen.getByText(SLEEP_START)).toBeInTheDocument()
    expect(screen.getByTestId(SLEEP_START_INPUT)).toBeInTheDocument()
  })

  it('has input sleep end', () => {
    render(<HomeForm {...defaultProps} />)

    expect(screen.getByText(SLEEP_END)).toBeInTheDocument()
    expect(screen.getByTestId(SLEEP_END_INPUT)).toBeInTheDocument()
  })

  it('has input submit', () => {
    render(<HomeForm {...defaultProps} />)

    expect(screen.getByText(SUBMIT_INPUT)).toBeInTheDocument()
  })

  test('input sleep start works', async () => {
    render(<HomeForm {...defaultProps} />)

    const testValue = '2022-09-16T22:17'
    const input = screen.getByTestId(SLEEP_START_INPUT) as HTMLInputElement
    fireEvent.change(input, { target: { value: testValue } })

    expect(input).toHaveValue(testValue)
  })

  test('input sleep end works', async () => {
    render(<HomeForm {...defaultProps} />)

    const testValue = '2022-09-17T05:21'
    const input = screen.getByTestId(SLEEP_END_INPUT) as HTMLInputElement
    fireEvent.change(input, { target: { value: testValue } })

    expect(input).toHaveValue(testValue)
  })

  describe('input sleep and end validation', () => {
    test('disable submit when form is empty', () => {
      render(<HomeForm {...defaultProps} />)

      expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
    })
    test('display error if sleep end < sleep start', () => {
      render(<HomeForm {...defaultProps} />)

      const startValue = '2022-09-16T22:17'
      const inputStart = screen.getByTestId(
        SLEEP_START_INPUT,
      ) as HTMLInputElement
      fireEvent.change(inputStart, { target: { value: startValue } })

      const startEnd = '2022-09-15T05:21'
      const inputEnd = screen.getByTestId(SLEEP_END_INPUT) as HTMLInputElement
      fireEvent.change(inputEnd, { target: { value: startEnd } })

      expect(screen.getByText(SLEEP_START_ERROR)).toBeInTheDocument()
      expect(screen.getByText(SLEEP_END_ERROR)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
    })

    test('not display error if sleep end > sleep start', () => {
      render(<HomeForm {...defaultProps} />)

      const startValue = '2022-09-16T22:17'
      const inputStart = screen.getByTestId(
        SLEEP_START_INPUT,
      ) as HTMLInputElement
      fireEvent.change(inputStart, { target: { value: startValue } })

      const startEnd = '2022-09-17T05:21'
      const inputEnd = screen.getByTestId(SLEEP_END_INPUT) as HTMLInputElement
      fireEvent.change(inputEnd, { target: { value: startEnd } })

      expect(screen.queryByText(SLEEP_START_ERROR)).not.toBeInTheDocument()
      expect(screen.queryByText(SLEEP_END_ERROR)).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled()
    })
  })

  describe('total sleep duration', () => {
    it('is not exists when form is empty', () => {
      render(<HomeForm {...defaultProps} />)

      expect(screen.queryByText(/total sleep: /i)).not.toBeInTheDocument()
    })

    it('exists after valid input', () => {
      render(<HomeForm {...defaultProps} />)

      const startValue = '2022-09-16T22:17'
      const inputStart = screen.getByTestId(
        SLEEP_START_INPUT,
      ) as HTMLInputElement
      fireEvent.change(inputStart, { target: { value: startValue } })

      const startEnd = '2022-09-17T05:21'
      const inputEnd = screen.getByTestId(SLEEP_END_INPUT) as HTMLInputElement
      fireEvent.change(inputEnd, { target: { value: startEnd } })

      expect(screen.getByText(/total sleep: 07:04/i)).toBeInTheDocument()
    })
  })

  describe('onSubmit', () => {
    test('when input valid trigger onSubmit', async () => {
      const user = userEvent.setup()
      render(<HomeForm {...defaultProps} />)

      const startValue = '2022-09-16T22:17'
      const inputStart = screen.getByTestId(
        SLEEP_START_INPUT,
      ) as HTMLInputElement
      fireEvent.change(inputStart, { target: { value: startValue } })

      const endValue = '2022-09-17T05:21'
      const inputEnd = screen.getByTestId(SLEEP_END_INPUT) as HTMLInputElement
      fireEvent.change(inputEnd, { target: { value: endValue } })

      expect(mockOnSubmit).not.toBeCalled()

      await user.click(screen.getByRole('button', { name: /submit/i }))

      expect(mockOnSubmit).toHaveBeenCalledWith({
        sleepStart: startValue,
        sleepEnd: endValue,
        totalSleep: '07:04',
      })
    })
  })
})
