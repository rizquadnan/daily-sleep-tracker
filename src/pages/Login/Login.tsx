import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import { getGradientBoxShadow } from 'assets/gradientBoxShadow'
import { mobileSpacedBox } from 'assets/mobileSpacedBox'
import { LoginRegisterForm, LoginRegisterFormVariant } from 'components'
import { Link } from 'react-router-dom'
import { pxToRem } from 'utils'
import { useLogin } from './hooks'

export function Login() {
  const { isSubmitting, handleLogin } = useLogin()

  const { colorMode } = useColorMode()

  return (
    <Container>
      <Center minH="100vh">
        <VStack
          shadow="xl"
          padding="6"
          w="100%"
          spacing="0"
          maxW={pxToRem(480)}
          alignItems="strech"
          {...mobileSpacedBox}
          {...getGradientBoxShadow(colorMode)}
        >
          <Heading as="h1" textAlign="center">
            Login
          </Heading>
          <VStack alignItems="stretch">
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
        </VStack>
      </Center>
    </Container>
  )
}

export default Login
