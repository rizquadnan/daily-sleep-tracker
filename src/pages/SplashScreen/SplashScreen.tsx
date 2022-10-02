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
import React from 'react'
import { pxToRem } from 'utils'

export function SplashScreen() {
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
                it out! Or Login to go to your account
              </Text>
            </Box>
            <ButtonGroup w="100%">
              <Button flex="1" onClick={() => alert('register')}>
                Register
              </Button>
              <Button flex="1" onClick={() => alert('login')}>
                Login
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </Center>
    </Container>
  )
}

export default SplashScreen
