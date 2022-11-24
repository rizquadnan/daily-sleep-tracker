import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { pxToRem } from 'utils'
import {
  LoginRegisterForm,
  LoginRegisterFormVariant,
} from 'components/LoginRegisterForm'
import { Link } from 'react-router-dom'

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
          <Box data-testid="form">
            <LoginRegisterForm
              variant={LoginRegisterFormVariant.Register}
              onSubmit={() => ''}
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

export default Register
