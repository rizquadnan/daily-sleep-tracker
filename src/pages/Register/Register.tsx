import { Center, Container, Heading, VStack } from '@chakra-ui/react'
import { pxToRem } from 'utils'
import RegisterForm from './RegisterForm'

export function Register() {
  return (
    <Container>
      <Center minH="100vh">
        <VStack
          shadow="xl"
          borderRadius="md"
          padding="6"
          w="100%"
          maxW={pxToRem(480)}
          alignItems="strech"
        >
          <Heading as="h1" textAlign="center">
            Register
          </Heading>
          <RegisterForm />
        </VStack>
      </Center>
    </Container>
  )
}

export default Register
