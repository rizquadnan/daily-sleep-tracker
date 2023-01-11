import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import { getGradientBoxShadow } from 'assets/gradientBoxShadow'
import { mobileSpacedBox } from 'assets/mobileSpacedBox'
import { useGuestMode } from 'providers'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from 'routes'
import { pxToRem } from 'utils'

export function SplashScreen() {
  const guestModeContext = useGuestMode()
  const navigate = useNavigate()
  const { colorMode } = useColorMode()

  return (
    <Container>
      <Center minH="100vh">
        <VStack
          zIndex={1}
          borderRadius="md"
          padding="6"
          w="100%"
          maxW={pxToRem(480)}
          alignItems="strech"
          spacing="24px"
          h={{ base: '73vh', md: 'initial' }}
          position={{ base: 'relative', md: 'initial' }}
          top={{ base: '2vh', md: 'initial' }}
          justifyContent={{ base: 'space-around', md: 'initial' }}
          {...mobileSpacedBox}
          {...getGradientBoxShadow(colorMode)}
        >
          <VStack>
            <Heading as="h1" textAlign="center">
              Welcome to Daily Sleep Tracker
            </Heading>
            <Box>
              <Text fontSize="15px" textAlign="center">
                You can find out your daily sleep patterns here. Register to try
                it out! Login to go to your account. Or try out the app using
                Guest Mode!
              </Text>
            </Box>
          </VStack>
          <VStack spacing="16px">
            <ButtonGroup w="100%">
              <Button as={Link} to="/register" variant="outline" flex="1">
                Register
              </Button>
              <Button as={Link} to="/login" variant="outline" flex="1">
                Login
              </Button>
            </ButtonGroup>
            <Box w="100%">
              <Button
                w="100%"
                flex="1"
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  guestModeContext.enterGuestMode()
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
