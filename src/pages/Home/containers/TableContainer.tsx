import { Box, Skeleton, useDisclosure } from '@chakra-ui/react'
import { useSleeps } from 'api'
import { useAuth } from 'providers'
import { useState } from 'react'
import { Column, Row, Table, TableActions, TableProps } from '../components'
import DeleteConfirmation from '../components/DeleteConfirmation/DeleteConfirmation'
import { HomeForm } from '../components/HomeForm'
import { Modal } from '../components/Modal'

function getHH(minutes: number) {
  return Math.round(minutes / 60)
}

function getMM(minutes: number) {
  return minutes % 60
}

function minutesToHHMM(minutes: number) {
  const HH = getHH(minutes) < 10 ? `0${getHH(minutes)}` : getHH(minutes) < 10
  const MM = getMM(minutes) < 10 ? `0${getMM(minutes)}` : getMM(minutes)

  return `${HH}:${MM}`
}

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

  const auth = useAuth()
  const { data, state } = useSleeps({
    shouldFetch: auth.isAuthenticated && auth.user != null,
    userId: auth.user ? auth.user.id : undefined,
  })

  if (state === 'loading' || state === 'idle') {
    return <Skeleton isLoaded={false} h={300} />
  }

  if (state === 'error') {
    return <div>Error</div>
  }

  const table: TableProps<Column, Array<Row>> = {
    columns: ['date', 'sleepStart', 'sleepEnd', 'totalDuration', 'actions'],
    rows: data
      ? data.map((sleep) => ({
          key: String(sleep.id),
          date: sleep.date,
          actions: <TableActions onEdit={onEdit} onDelete={onDelete} />,
          sleepEnd: sleep.sleepEnd,
          sleepStart: sleep.sleepStart,
          totalDuration: minutesToHHMM(sleep.sleepDuration),
        }))
      : [],
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
