import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import { pxToRem } from 'utils'
import {
  LoginRegisterForm,
  LoginRegisterFormVariant,
} from 'components/LoginRegisterForm'
import { Link } from 'react-router-dom'
import { useRegister } from './hooks'
import { getGradientBoxShadow } from 'assets/gradientBoxShadow'
import { mobileSpacedBox } from 'assets/mobileSpacedBox'

export function Register() {
  const { isSubmitting, handleRegister } = useRegister()

  const { colorMode } = useColorMode()

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
          {...mobileSpacedBox}
          {...getGradientBoxShadow(colorMode)}
        >
          <Heading as="h1" textAlign="center">
            Register
          </Heading>
          <VStack alignItems="stretch">
            <Box data-testid="form">
              <LoginRegisterForm
                variant={LoginRegisterFormVariant.Register}
                isLoading={isSubmitting}
                onSubmit={handleRegister}
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

export default Register
