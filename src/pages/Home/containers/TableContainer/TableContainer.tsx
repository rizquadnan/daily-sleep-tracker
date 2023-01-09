import { Skeleton, useDisclosure } from '@chakra-ui/react'
import { useSleeps } from 'api'
import { Sleep } from 'models'
import { useAuth } from 'providers'
import { useState } from 'react'
import { Column, Row, TableActions, TableProps } from '../../components'
import { useDelete, useSubmit } from './hooks'

import { ErrorState } from 'components'
import { TableAndPagination } from '../TableAndPagination'

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
  const { data, totalPage, state, mutate, error } = useSleeps({
    shouldFetch: auth.isAuthenticated && auth.user != null,
    userId: auth.user ? auth.user.id : undefined,
    page,
    pageSize: PAGE_SIZE,
  })

  const { handleSubmit } = useSubmit({
    closeModalCallback: onCloseFormModal,
    refetchSleeps: () => mutate(),
  })

  const { handleDelete } = useDelete({
    closeModalCallback: onCloseDeleteModal,
    refetchSleeps: () => mutate(),
  })

  if (state === 'loading' || state === 'idle') {
    return <Skeleton isLoaded={false} h={300} />
  }

  if (state === 'error') {
    return <ErrorState errorMessage={error ?? ''} />
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
  const isTableEmpty = table.rows.length === 0

  return (
    <TableAndPagination
      emptyData={isTableEmpty}
      columns={table.columns}
      rows={table.rows}
      page={page}
      totalPage={validTotalPage}
      onNextPage={() => setPage((prev) => prev + 1)}
      onPrevPage={() => setPage((prev) => prev - 1)}
      isFormModalOpen={isFormModalOpen}
      onCloseFormModal={onCloseFormModal}
      formEditInitialValues={formEditInitialValues}
      onSubmit={(formValues) => {
        if (formEditInitialValues?.id) {
          handleSubmit({
            ...formValues,
            sleepId: formEditInitialValues.id,
          })
        }
      }}
      isDeleteModalOpen={isDeleteModalOpen}
      onCloseDeleteModal={onCloseDeleteModal}
      onDelete={() => {
        if (deleteSleepId) {
          handleDelete(deleteSleepId)
        }
      }}
    />
  )
}

export default TableContainer
