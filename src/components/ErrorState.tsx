import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import error from '../assets/error.svg'

type ErrorStateProps = {
  errorMessage?: string
}
export function ErrorState(props: ErrorStateProps) {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <Flex alignItems="center" justifyContent="center">
      <VStack spacing="24px">
        <VStack spacing="8px">
          <Box h={200} w={200}>
            <Image src={error}></Image>
          </Box>
          {props.errorMessage && (
            <Box
              as={'pre'}
              backgroundColor="black"
              color="white"
              padding="12px"
              borderRadius="8px"
            >
              Error: {props.errorMessage}
            </Box>
          )}
        </VStack>
        <VStack>
          <Text>
            Failed to get your data. Click here to refresh page & try again!
          </Text>
          <Button onClick={handleRefresh} variant="ghost">
            Refresh Page
          </Button>
        </VStack>
      </VStack>
    </Flex>
  )
}
