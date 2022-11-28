import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { pxToRem } from 'utils'
import {
  LoginRegisterForm,
  LoginRegisterFormVariant,
} from 'components/LoginRegisterForm'
import { Link, useNavigate } from 'react-router-dom'
import { handleRegister } from './handleRegister'
import { useState } from 'react'

export function Register() {
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
            Register
          </Heading>
          <Box data-testid="form">
            <LoginRegisterForm
              variant={LoginRegisterFormVariant.Register}
              isLoading={isSubmitting}
              onSubmit={async (formValues) => {
                setIsSubmitting(true)
                await handleRegister(formValues)
                setIsSubmitting(false)

                toast({
                  title: 'Account created!',
                  description:
                    'To use the app. Please login with your credentials',
                  isClosable: true,
                })

                navigate('/login')
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

export default Register
