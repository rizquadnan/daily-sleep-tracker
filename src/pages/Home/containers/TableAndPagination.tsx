import { Box, Flex, VStack } from '@chakra-ui/react'
import { EmptyData } from 'components'
import {
  Column,
  DeleteConfirmation,
  FormValues,
  HomeForm,
  Modal,
  Pagination,
  Row,
  Table,
} from '../components'

type TableAndPaginationProps = {
  emptyData?: boolean
  columns: Column
  rows: Row[]
  page: number
  totalPage: number
  onNextPage: () => void
  onPrevPage: () => void
  isFormModalOpen: boolean
  onCloseFormModal: () => void
  formEditInitialValues?: {
    id: number
    sleepStart: string
    totalSleep: string
    sleepEnd: string
    date: string
  }
  onSubmit: (formValues: FormValues) => void
  isDeleteModalOpen: boolean
  onCloseDeleteModal: () => void
  onDelete: () => void
}

export function TableAndPagination(props: TableAndPaginationProps) {
  return (
    <>
      <VStack alignItems="stretch">
        {props.emptyData ? (
          <EmptyData />
        ) : (
          <>
            <Table<Column, Array<Row>>
              columns={props.columns}
              rows={props.rows}
            />
            <Flex justifyContent="flex-end">
              <Pagination
                page={props.page}
                totalPage={props.totalPage}
                onNext={props.onNextPage}
                onPrev={props.onPrevPage}
              />
            </Flex>
          </>
        )}
      </VStack>
      <Modal
        isOpen={props.isFormModalOpen}
        onClose={props.onCloseFormModal}
        title="Edit Sleep Data"
      >
        <Box paddingBottom="24px">
          <HomeForm
            variant="edit"
            initialValues={
              props.formEditInitialValues ?? {
                sleepEnd: '',
                sleepStart: '',
                totalSleep: '',
                date: '',
              }
            }
            onSubmit={props.onSubmit}
          />
        </Box>
      </Modal>
      <Modal
        isOpen={props.isDeleteModalOpen}
        onClose={props.onCloseDeleteModal}
        title="Delete Sleep Data"
      >
        <Box data-testid="delete-modal-content">
          <DeleteConfirmation
            onClickNo={props.onCloseDeleteModal}
            onClickYes={props.onDelete}
          />
        </Box>
      </Modal>
    </>
  )
}
