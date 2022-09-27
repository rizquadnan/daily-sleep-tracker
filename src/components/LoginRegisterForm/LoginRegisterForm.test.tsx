import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginRegisterForm, {
  LoginRegisterFormProps,
  LoginRegisterFormVariant,
} from './LoginRegisterForm'

const getInput = (role: string, name: string | RegExp) =>
  screen.getByRole<HTMLInputElement>(role, { name })
const getNameInput = () => getInput('textbox', /name/i)
const getEmailInput = () => getInput('textbox', /email/i)
const getPasswordInput = () => getInput('textbox', /password/i)
const getSubmitInput = () => screen.getByRole('button', { name: /submit/i })
describe('<LoginRegisterForm />', () => {
  const defaultProps: LoginRegisterFormProps = {
    onSubmit: jest.fn(),
    variant: LoginRegisterFormVariant.Register,
  }
  describe('form completeness', () => {
    it('has email input and email label', () => {
      render(<LoginRegisterForm {...defaultProps} />)

      const emailInput = getEmailInput()
      expect(emailInput).toBeInTheDocument()

      const emailLabel = screen.getByLabelText(/email/i)
      expect(emailLabel).toBeInTheDocument()
    })

    it('has password input and password label', () => {
      render(<LoginRegisterForm {...defaultProps} />)

      const passwordInput = getPasswordInput()
      expect(passwordInput).toBeInTheDocument()

      const passwordLabel = screen.getByLabelText(/password/i)
      expect(passwordLabel).toBeInTheDocument()
    })

    it('has submit button', () => {
      render(<LoginRegisterForm {...defaultProps} />)

      const submitButton = getSubmitInput()
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('input on change', () => {
    const setup = () => {
      const user = userEvent.setup()
      render(<LoginRegisterForm {...defaultProps} />)

      return {
        user,
      }
    }
    it('name input on change works', async () => {
      const { user } = setup()

      const inputFromUser = 'hello world'
      const input = getNameInput()
      await user.type(input, inputFromUser)

      expect(input.value).toBe(inputFromUser)
    })

    it('email input on change works', async () => {
      const { user } = setup()

      const inputFromUser = 'hello_world@gmail.com'
      const input = getEmailInput()
      await user.type(input, inputFromUser)

      expect(input.value).toBe(inputFromUser)
    })

    it('password input on change works', async () => {
      const { user } = setup()

      const inputFromUser = 'this_is_password'
      const input = getPasswordInput()
      await user.type(input, inputFromUser)

      expect(input.value).toBe(inputFromUser)
    })
  })

  describe('submission', () => {
    test('register variant, submits properly', async () => {
      const user = userEvent.setup()
      const handleSubmit = jest.fn()
      render(
        <LoginRegisterForm {...{ ...defaultProps, onSubmit: handleSubmit }} />,
      )

      const nameInput = getNameInput()
      expect(nameInput).toBeInvalid()
      const nameInputValue = 'anything'
      await user.type(nameInput, nameInputValue)
      expect(nameInput).toBeValid()

      const emailInput = getEmailInput()
      expect(emailInput).toBeInvalid()
      const emailInputValue = 'anything@gmail.com'
      await user.type(emailInput, emailInputValue)
      expect(emailInput).toBeValid()

      const passwordInput = getPasswordInput()
      expect(passwordInput).toBeInvalid()
      const passwordInputValue = 'anything-password'
      await user.type(passwordInput, passwordInputValue)
      expect(passwordInput).toBeValid()

      const submitInput = getSubmitInput()
      expect(handleSubmit).toBeCalledTimes(0)
      await user.click(submitInput)
      expect(handleSubmit).toBeCalledWith({
        name: nameInputValue,
        email: emailInputValue,
        password: passwordInputValue,
      })
    })

    test('login variant, submits properly', async () => {
      const user = userEvent.setup()
      const handleSubmit = jest.fn()
      render(
        <LoginRegisterForm {...{ ...defaultProps, onSubmit: handleSubmit }} />,
      )

      const emailInput = getEmailInput()
      expect(emailInput).toBeInvalid()
      const emailInputValue = 'anything@gmail.com'
      await user.type(emailInput, emailInputValue)
      expect(emailInput).toBeValid()

      const passwordInput = getPasswordInput()
      expect(passwordInput).toBeInvalid()
      const passwordInputValue = 'anything-password'
      await user.type(passwordInput, passwordInputValue)
      expect(passwordInput).toBeValid()

      const submitInput = getSubmitInput()
      expect(handleSubmit).toBeCalledTimes(0)
      await user.click(submitInput)
      expect(handleSubmit).toBeCalledWith({
        email: emailInputValue,
        password: passwordInputValue,
      })
    })
  })

  test('login variant, has no name label and name input', () => {
    render(
      <LoginRegisterForm
        {...{ ...defaultProps, variant: LoginRegisterFormVariant.Login }}
      />,
    )

    expect(
      screen.queryByRole('textbox', { name: /name/i }),
    ).not.toBeInTheDocument()

    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
  })

  test('register variant, has name label and name input', () => {
    render(<LoginRegisterForm {...defaultProps} />)

    const nameInput = getNameInput()
    expect(nameInput).toBeInTheDocument()

    const nameLabel = screen.getByLabelText(/name/i)
    expect(nameLabel).toBeInTheDocument()
  })
})
