import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAuth } from 'providers'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from 'routes'
import { pxToRem } from 'utils'

export function SplashScreen() {
  const authContext = useAuth()
  const navigate = useNavigate()

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
          spacing="24px"
        >
          <Heading as="h1" textAlign="center">
            Welcome to Daily Sleep Tracker
          </Heading>
          <VStack spacing="16px">
            <Box>
              <Text>
                You can find out your daily sleep patterns here. Register to try
                it out! Login to go to your account. Or try out the app using
                Guest Mode!
              </Text>
            </Box>
            <ButtonGroup w="100%">
              <Button as={Link} to="/register" flex="1">
                Register
              </Button>
              <Button as={Link} to="/login" flex="1">
                Login
              </Button>
            </ButtonGroup>
            <Box w="100%">
              <Button
                w="100%"
                flex="1"
                onClick={() => {
                  authContext.enterGuestMode()
                  navigate(ROUTES.home)
                }}
              >
                Guest Mode
              </Button>
            </Box>
          </VStack>
        </VStack>
      </Center>
    </Container>
  )
}

export default SplashScreen
