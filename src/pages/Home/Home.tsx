import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { AxisLinearOptions, Chart } from 'react-charts'

import mock from './mock.json'

export function Home() {
  const primaryAxis = React.useMemo<
    AxisLinearOptions<typeof mock[number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => Number(datum.primary),
    }),
    [],
  )
  const secondaryAxes = React.useMemo<
    AxisLinearOptions<typeof mock[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    [],
  )
  return (
    <Container maxW="container.lg">
      <VStack alignItems="stretch" padding="10rem 0" spacing="10">
        <Heading textAlign="center">Home</Heading>
        <Stack
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'stretch', lg: 'center' }}
          justifyContent="stretch"
        >
          <Box flex="1" minH="300px" minW="300px">
            <Chart
              options={{
                data: mock,
                primaryAxis,
                secondaryAxes,
                tooltip: false,
              }}
            />
          </Box>
          <Box flex="1">Table</Box>
        </Stack>
        <Button w="100%" colorScheme="orange">
          New Entry
        </Button>
      </VStack>
    </Container>
  )
}

export default Home
