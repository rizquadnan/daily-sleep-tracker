import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { LoginRegisterForm, LoginRegisterFormVariant } from 'components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from 'routes'
import { pxToRem } from 'utils'
import { handleLogin } from './handleLogin'

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

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
              onSubmit={async (formValues) => {
                setIsSubmitting(true)
                await handleLogin(formValues)
                setIsSubmitting(false)

                toast({
                  title: 'Successfull',
                  description: 'Welcome to daily sleep tracker!',
                  isClosable: true,
                })

                navigate(ROUTES.home)
              }}
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
