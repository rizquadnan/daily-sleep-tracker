import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'

export enum LoginRegisterFormVariant {
  Login = 'login',
  Register = 'register',
}

type LoginFormValue = {
  name?: string
  email: string
  password: string
}

export type LoginRegisterFormProps = {
  variant: LoginRegisterFormVariant
  onSubmit: (formValues: LoginFormValue) => void
}

export function LoginRegisterForm(props: LoginRegisterFormProps) {
  const [name, setName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()

  return (
    <VStack
      spacing="8"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()

        if (
          props.variant === LoginRegisterFormVariant.Login &&
          name &&
          email &&
          password
        ) {
          props.onSubmit({
            email,
            password,
          })
        } else if (
          props.variant === LoginRegisterFormVariant.Register &&
          email &&
          password
        ) {
          props.onSubmit({
            name,
            email,
            password,
          })
        }
      }}
    >
      <VStack alignItems="stretch" spacing="6" w="100%">
        {props.variant === LoginRegisterFormVariant.Register && (
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        )}
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            role="textbox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </VStack>
      <Input type="submit" />
    </VStack>
  )
}

export default LoginRegisterForm
