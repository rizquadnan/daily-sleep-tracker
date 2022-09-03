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

import { mock } from './mock'
import Table from './Table'
import { Column, Row } from './tableEntity'

export function Home() {
  const primaryAxis = React.useMemo<
    AxisLinearOptions<typeof mock['chart'][number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => Number(datum.primary),
    }),
    [],
  )
  const secondaryAxes = React.useMemo<
    AxisLinearOptions<typeof mock['chart'][number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    [],
  )
  return (
    <Container maxW="container.xl">
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
                data: mock.chart,
                primaryAxis,
                secondaryAxes,
                tooltip: false,
              }}
            />
          </Box>
          <Box flex="1">
            <Table<Column, Array<Row>>
              columns={mock.table.columns}
              rows={mock.table.rows}
            />
          </Box>
        </Stack>
        <Button w="100%" colorScheme="orange">
          New Entry
        </Button>
      </VStack>
    </Container>
  )
}

export default Home
