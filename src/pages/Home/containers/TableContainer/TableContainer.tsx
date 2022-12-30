import { Box, Flex, Skeleton, useDisclosure, VStack } from '@chakra-ui/react'
import { useSleeps } from 'api'
import { Sleep } from 'models'
import { useAuth } from 'providers'
import { useState } from 'react'
import {
  Column,
  Row,
  Table,
  TableActions,
  TableProps,
  Modal,
  HomeForm,
  DeleteConfirmation,
  Pagination,
} from '../../components'
import { useDelete, useSubmit } from './hooks'

function getHH(minutes: number) {
  return Math.floor(minutes / 60)
}

function getMM(minutes: number) {
  return minutes % 60
}

function minutesToHHMM(minutes: number) {
  const HH = getHH(minutes) < 10 ? `0${getHH(minutes)}` : getHH(minutes) < 10
  const MM = getMM(minutes) < 10 ? `0${getMM(minutes)}` : getMM(minutes)

  return `${HH}:${MM}`
}

function toYYYYMMDD(ddMmYy: string) {
  const [dd, mm, yy] = ddMmYy.split('-')

  return `${yy}-${mm}-${dd}`
}

const PAGE_SIZE = 5

export function TableContainer() {
  const [formEditInitialValues, setFormEditInitialValues] = useState<
    | {
        id: number
        sleepStart: string
        totalSleep: string
        sleepEnd: string
        date: string
      }
    | undefined
  >()
  const [deleteSleepId, setDeleteSleepId] = useState<number | null>(null)

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

  const onEdit = (sleep: Sleep) => {
    setFormEditInitialValues({
      sleepStart: sleep.sleepStart,
      sleepEnd: sleep.sleepEnd,
      totalSleep: minutesToHHMM(sleep.sleepDuration),
      date: toYYYYMMDD(sleep.date),
      id: sleep.id,
    })

    onOpenFormModal()
  }

  const onDelete = (sleep: Sleep) => {
    setDeleteSleepId(sleep.id)

    onOpenDeleteModal()
  }

  const auth = useAuth()
  const [page, setPage] = useState(1)
  const { data, totalPage, state, mutate } = useSleeps({
    shouldFetch: auth.isAuthenticated && auth.user != null,
    userId: auth.user ? auth.user.id : undefined,
    page,
    pageSize: PAGE_SIZE,
  })

  const { handleSubmit } = useSubmit({
    closeModalCallback: onCloseFormModal,
  })

  const { handleDelete } = useDelete({
    closeModalCallback: onCloseDeleteModal,
    refetchSleeps: () => mutate(),
  })

  if (state === 'loading' || state === 'idle') {
    return <Skeleton isLoaded={false} h={300} />
  }

  if (state === 'error') {
    return <div>Error</div>
  }

  const validTotalPage = totalPage ?? 1
  const table: TableProps<Column, Array<Row>> = {
    columns: ['date', 'sleepStart', 'sleepEnd', 'totalDuration', 'actions'],
    rows: data
      ? data.map((sleep) => ({
          key: String(sleep.id),
          date: sleep.date,
          actions: (
            <TableActions
              onEdit={() => onEdit(sleep)}
              onDelete={() => onDelete(sleep)}
            />
          ),
          sleepEnd: sleep.sleepEnd,
          sleepStart: sleep.sleepStart,
          totalDuration: minutesToHHMM(sleep.sleepDuration),
        }))
      : [],
  }

  return (
    <>
      <VStack alignItems="stretch">
        <Table<Column, Array<Row>> columns={table.columns} rows={table.rows} />
        <Flex justifyContent="flex-end">
          <Pagination
            page={page}
            totalPage={validTotalPage}
            onNext={() => setPage((prev) => prev + 1)}
            onPrev={() => setPage((prev) => prev - 1)}
          />
        </Flex>
      </VStack>
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
                date: '',
              }
            }
            onSubmit={(formValues) => {
              if (formEditInitialValues?.id) {
                handleSubmit({
                  ...formValues,
                  sleepId: formEditInitialValues.id,
                })
              }
            }}
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
            onClickYes={() => {
              if (deleteSleepId) {
                handleDelete(deleteSleepId)
              }
            }}
          />
        </Box>
      </Modal>
    </>
  )
}

export default TableContainer
