import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginRegisterForm from './LoginRegisterForm'

const getInput = (role: string, name: string | RegExp) =>
  screen.getByRole<HTMLInputElement>(role, { name })
const getNameInput = () => getInput('textbox', /name/i)
const getEmailInput = () => getInput('textbox', /email/i)
const getPasswordInput = () => getInput('textbox', /password/i)
const getSubmitInput = () => screen.getByRole('button', { name: /submit/i })
describe('<LoginRegisterForm />', () => {
  describe('form completeness', () => {
    it('has name input and name label', () => {
      render(<LoginRegisterForm onSubmit={() => ''} />)

      const nameInput = getNameInput()
      expect(nameInput).toBeInTheDocument()

      const nameLabel = screen.getByLabelText(/name/i)
      expect(nameLabel).toBeInTheDocument()
    })

    it('has email input and email label', () => {
      render(<LoginRegisterForm onSubmit={() => ''} />)

      const emailInput = getEmailInput()
      expect(emailInput).toBeInTheDocument()

      const emailLabel = screen.getByLabelText(/email/i)
      expect(emailLabel).toBeInTheDocument()
    })

    it('has password input and password label', () => {
      render(<LoginRegisterForm onSubmit={() => ''} />)

      const passwordInput = getPasswordInput()
      expect(passwordInput).toBeInTheDocument()

      const passwordLabel = screen.getByLabelText(/password/i)
      expect(passwordLabel).toBeInTheDocument()
    })

    it('has submit button', () => {
      render(<LoginRegisterForm onSubmit={() => ''} />)

      const submitButton = getSubmitInput()
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('input on change', () => {
    const setup = () => {
      const user = userEvent.setup()
      render(<LoginRegisterForm onSubmit={() => ''} />)

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
    it('submits properly', async () => {
      const user = userEvent.setup()
      const handleSubmit = jest.fn()
      render(<LoginRegisterForm onSubmit={handleSubmit} />)

      const nameInput = getNameInput()
      expect(nameInput).toBeInvalid()
      await user.type(nameInput, 'anything')
      expect(nameInput).toBeValid()

      const emailInput = getEmailInput()
      expect(emailInput).toBeInvalid()
      await user.type(emailInput, 'anything@gmail.com')
      expect(emailInput).toBeValid()

      const passwordInput = getPasswordInput()
      expect(passwordInput).toBeInvalid()
      await user.type(passwordInput, 'anything')
      expect(passwordInput).toBeValid()

      const submitInput = getSubmitInput()
      expect(handleSubmit).toBeCalledTimes(0)
      await user.click(submitInput)
      expect(handleSubmit).toBeCalledTimes(1)
      await user.click(submitInput)
      expect(handleSubmit).toBeCalledTimes(2)
    })
  })
})
