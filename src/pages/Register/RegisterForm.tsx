import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'

export function RegisterForm() {
  return (
    <VStack spacing="8" as="form">
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
          <Input type="password" />
        </FormControl>
      </VStack>
      <Input type="submit" />
    </VStack>
  )
}

export default RegisterForm
