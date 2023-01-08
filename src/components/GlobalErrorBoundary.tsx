import React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Box, Button, Container, Heading, Flex, VStack } from '@chakra-ui/react'

export function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary fallbackRender={GlobalErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container>
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <VStack alignItems="stretch" spacing="32px">
          <Heading as="h1">App crashed. Sorry something went wrong...</Heading>
          <VStack alignItems="stretch" spacing="12px">
            <Box
              as={'pre'}
              backgroundColor="black"
              color="white"
              padding="12px"
              borderRadius="8px"
            >
              Error: {error.message}
            </Box>
            <Button onClick={resetErrorBoundary}>Reset App</Button>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  )
}
