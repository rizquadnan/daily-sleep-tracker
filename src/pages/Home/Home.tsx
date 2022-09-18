import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { AxisLinearOptions, Chart } from 'react-charts'

import { mock } from './components/Table/mock'
import { Table, Column, Row } from './components/Table'
import { Modal } from './components/Modal'
import { HomeForm } from './components/HomeForm'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container maxW="container.xl">
      <VStack alignItems="stretch" padding="10rem 0" spacing="10">
        <Heading textAlign="center">Home</Heading>
        <Stack
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'stretch', lg: 'center' }}
          justifyContent="stretch"
        >
          <Box flex="1" minH="300px" minW="300px" data-testid="chart">
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
        <Button w="100%" colorScheme="orange" onClick={() => onOpen()}>
          New Entry
        </Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} title="Add Sleep Data">
        <Box paddingBottom="24px">
          <HomeForm onSubmit={() => alert('submit')} />
        </Box>
      </Modal>
    </Container>
  )
}

export default Home
