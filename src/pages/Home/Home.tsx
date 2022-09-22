import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
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
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation'
import ChartContainer from './containers/ChartContainer'

export function Home() {
  const [formEditInitialValues, setFormEditInitialValues] = useState<
    | {
        sleepStart: string
        sleepEnd: string
        totalSleep: string
      }
    | undefined
  >()

  const {
    isOpen: isFormModalOpen,
    onOpen: onOpenFormModal,
    onClose: onCloseFormModal,
  } = useDisclosure()
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure()

  const onEdit = () => {
    setFormEditInitialValues({
      sleepStart: '2022-09-16T22:17',
      sleepEnd: '2022-09-17T05:21',
      totalSleep: '07:04',
    })

    onOpenFormModal()
  }

  const onDelete = () => {
    onOpenDeleteModal()
  }

  const renderTableActions = () => (
    <TableActions onEdit={onEdit} onDelete={onDelete} />
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
            <ChartContainer />
          </Box>
          <Box flex="1">
            <Table<Column, Array<Row>>
              columns={table.columns}
              rows={table.rows}
            />
          </Box>
        </Stack>
        <Button w="100%" colorScheme="orange" onClick={() => onOpenFormModal()}>
          New Entry
        </Button>
      </VStack>
      <Modal
        isOpen={isFormModalOpen}
        onClose={onCloseFormModal}
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
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        title="Delete Sleep Data"
      >
        <Box data-testid="delete-modal-content">
          <DeleteConfirmation
            onClickNo={onCloseDeleteModal}
            onClickYes={() => alert('Delete')}
          />
        </Box>
      </Modal>
    </Container>
  )
}

export default Home
