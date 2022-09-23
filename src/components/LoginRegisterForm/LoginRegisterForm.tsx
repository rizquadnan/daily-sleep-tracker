import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

type LoginRegisterFormProps = {
  onSubmit: () => void
}

export function LoginRegisterForm(props: LoginRegisterFormProps) {
  return (
    <VStack
      spacing="8"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()

        props.onSubmit()
      }}
    >
      <VStack alignItems="stretch" spacing="6" w="100%">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" role="textbox" />
        </FormControl>
      </VStack>
      <Input type="submit" />
    </VStack>
  )
}

export default LoginRegisterForm
