import { Box, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Column, Row, Table, TableActions, TableProps } from '../components'
import DeleteConfirmation from '../components/DeleteConfirmation/DeleteConfirmation'
import { HomeForm } from '../components/HomeForm'
import { Modal } from '../components/Modal'

export function TableContainer() {
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
    <>
      <Table<Column, Array<Row>> columns={table.columns} rows={table.rows} />
      <Modal
        isOpen={isFormModalOpen}
        onClose={onCloseFormModal}
        title="Edit Sleep Data"
      >
        <Box paddingBottom="24px">
          <HomeForm
            variant="edit"
            initialValues={
              formEditInitialValues ?? {
                sleepEnd: '',
                sleepStart: '',
                totalSleep: '',
              }
            }
            onSubmit={() => alert('submit')}
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
    </>
  )
}

export default TableContainer
