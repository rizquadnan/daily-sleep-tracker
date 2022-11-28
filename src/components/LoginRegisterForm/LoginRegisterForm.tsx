import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import {
  LoginRegisterFormProps,
  LoginRegisterFormVariant,
  RegisterFormValue,
} from './loginRegisterTypes'
import { validateForm } from './loginRegisterValidation'

export function LoginRegisterForm(props: LoginRegisterFormProps) {
  const [name, setName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()

  const handleClickSubmit = () => {
    const isFormValid = validateForm({
      variant: props.variant,
      formValues: { name, email, password },
    })

    if (isFormValid) {
      props.onSubmit({ name, email, password } as Record<
        keyof RegisterFormValue,
        string
      >)
    }
  }

  return (
    <VStack spacing="8" as="form" alignItems="stretch">
      <VStack alignItems="stretch" spacing="6" w="100%">
        {props.variant === LoginRegisterFormVariant.Register && (
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isDisabled={props.isLoading}
            />
          </FormControl>
        )}
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={props.isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            role="textbox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isDisabled={props.isLoading}
          />
        </FormControl>
      </VStack>
      <Button onClick={handleClickSubmit} isLoading={props.isLoading}>
        Submit
      </Button>
    </VStack>
  )
}

export default LoginRegisterForm
