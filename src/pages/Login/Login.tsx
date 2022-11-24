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

export function Login() {
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
              variant={LoginRegisterFormVariant.Login}
              onSubmit={() => alert('submit')}
            />
          </Box>
          <Button as={Link} to="/">
            Go Back
          </Button>
        </VStack>
      </Center>
    </Container>
  )
}

export default Login
