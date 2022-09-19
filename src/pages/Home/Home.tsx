import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AxisLinearOptions, Chart } from 'react-charts'

import { mock } from './components/Table/mock'
import {
  Table,
  Column,
  Row,
  TableProps,
  TableActions,
} from './components/Table'
import { Modal } from './components/Modal'
import { HomeForm } from './components/HomeForm'

export function Home() {
  const [formEditInitialValues, setFormEditInitialValues] = useState<
    | {
        sleepStart: string
        sleepEnd: string
        totalSleep: string
      }
    | undefined
  >()

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

  const onEdit = () => {
    setFormEditInitialValues({
      sleepStart: '2022-09-16T22:17',
      sleepEnd: '2022-09-17T05:21',
      totalSleep: '07:04',
    })

    onOpen()
  }

  const renderTableActions = () => (
    <TableActions onEdit={onEdit} onDelete={() => alert('Delete')} />
  )
  const table: TableProps<Column, Array<Row>> = {
    columns: ['date', 'sleepStart', 'sleepEnd', 'totalDuration', 'actions'],
    rows: [
      {
        key: '1',
        date: '13/12/21',
        sleepStart: '22:00',
        sleepEnd: '05:00',
        totalDuration: '07:00',
        actions: renderTableActions(),
      },
      {
        key: '2',
        date: '14/12/21',
        sleepStart: '23:00',
        sleepEnd: '05:20',
        totalDuration: '06:20',
        actions: renderTableActions(),
      },
      {
        key: '3',
        date: '15/12/21',
        sleepStart: '20:00',
        sleepEnd: '04:00',
        totalDuration: '08:00',
        actions: renderTableActions(),
      },
    ],
  }

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
              columns={table.columns}
              rows={table.rows}
            />
          </Box>
        </Stack>
        <Button w="100%" colorScheme="orange" onClick={() => onOpen()}>
          New Entry
        </Button>
      </VStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={formEditInitialValues ? 'Edit Sleep Data' : 'Add Sleep Data'}
      >
        <Box paddingBottom="24px">
          <HomeForm
            {...(formEditInitialValues
              ? {
                  variant: 'edit',
                  initialValues: formEditInitialValues,
                  onSubmit: () => alert('submit'),
                }
              : { variant: 'create', onSubmit: () => alert('submit') })}
          />
        </Box>
      </Modal>
    </Container>
  )
}

export default Home
