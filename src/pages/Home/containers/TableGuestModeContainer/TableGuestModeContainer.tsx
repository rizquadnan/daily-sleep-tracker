import { useDisclosure } from '@chakra-ui/react'
import { useMockSleeps } from 'api'
import { Sleep } from 'models'
import { useState } from 'react'
import { Column, Row, TableActions, TableProps } from '../../components'
import { TableAndPagination } from '../TableAndPagination'
import { PAGE_SIZE } from './constant'
import {
  minutesToHHMM,
  toDDMMYYYY,
  toYYYYMMDD,
  toMinutesDuration,
} from './utils'

export function TableGuestModeContainer() {
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

  const [page, setPage] = useState(1)
  const { data, totalPage, handleDelete, handleEdit } = useMockSleeps({
    page,
    pageSize: PAGE_SIZE,
  })

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
          handleEdit({
            formValues: {
              ...formValues,
              sleepId: formEditInitialValues.id,
            },
            closeModalCallback: onCloseFormModal,
            formatDate: toDDMMYYYY,
            formatDuration: toMinutesDuration,
          })
        }
      }}
      isDeleteModalOpen={isDeleteModalOpen}
      onCloseDeleteModal={onCloseDeleteModal}
      onDelete={() => {
        if (deleteSleepId) {
          handleDelete({
            deleteSleepId,
            closeModalCallback: onCloseDeleteModal,
          })
        }
      }}
    />
  )
}

export default TableGuestModeContainer
