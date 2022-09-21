import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DeleteConfirmation, {
  DeleteConfirmationProps,
} from './DeleteConfirmation'

describe('<DeleteConfirmation />', () => {
  const onClickNoMock = jest.fn()
  const onClickYesMock = jest.fn()
  const defaultProps: DeleteConfirmationProps = {
    onClickNo: onClickNoMock,
    onClickYes: onClickYesMock,
  }
  it('renders successfully', () => {
    render(<DeleteConfirmation {...defaultProps} />)

    expect(
      screen.getByText(/are you sure to delete this data ?/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument()
  })

  test('onClickNo', async () => {
    const user = userEvent.setup()
    render(<DeleteConfirmation {...defaultProps} />)

    expect(onClickNoMock).not.toBeCalled()

    const button = screen.getByRole('button', { name: /no/i })
    await user.click(button)

    expect(onClickNoMock).toBeCalledTimes(1)

    await user.click(button)
    await user.click(button)

    expect(onClickNoMock).toBeCalledTimes(3)
  })

  test('onClickYes', async () => {
    const user = userEvent.setup()
    render(<DeleteConfirmation {...defaultProps} />)

    expect(onClickYesMock).not.toBeCalled()

    const button = screen.getByRole('button', { name: /yes/i })
    await user.click(button)

    expect(onClickYesMock).toBeCalledTimes(1)

    await user.click(button)
    await user.click(button)

    expect(onClickYesMock).toBeCalledTimes(3)
  })
})
