import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { LoginRegisterForm, LoginRegisterFormVariant } from 'components'
import { Link } from 'react-router-dom'
import { pxToRem } from 'utils'
import { useLogin } from './hooks'

export function Login() {
  const { isSubmitting, handleLogin } = useLogin()

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
            Login
          </Heading>
          <Box data-testid="form">
            <LoginRegisterForm
              isLoading={isSubmitting}
              variant={LoginRegisterFormVariant.Login}
              onSubmit={handleLogin}
            />
          </Box>
          <Button as={Link} to="/" isDisabled={isSubmitting}>
            Go Back
          </Button>
        </VStack>
      </Center>
    </Container>
  )
}

export default Login
