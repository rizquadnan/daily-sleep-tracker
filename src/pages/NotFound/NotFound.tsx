import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import { getGradientBoxShadow } from 'assets/gradientBoxShadow'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const { colorMode } = useColorMode()
  const navigate = useNavigate()

  return (
    <Container>
      <Center minH="100vh">
        <VStack
          {...getGradientBoxShadow(colorMode)}
          borderRadius="md"
          padding="6"
          spacing="24px"
        >
          <VStack>
            <Heading>404 Not Found</Heading>
            <Text>The page you are looking for doesn't exists</Text>
          </VStack>
          <Button onClick={() => navigate(-1)}>Back to previous page</Button>
        </VStack>
      </Center>
    </Container>
  )
}
