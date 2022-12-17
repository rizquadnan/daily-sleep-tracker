import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { ButtonGroup, IconButton } from '@chakra-ui/react'

type PaginationProps = {
  page: number
  totalPage: number
  onPrev(): void
  onNext(): void
}

const isFirstPage = (page: number) => page === 1
const isLastPage = (page: number, totalPage: number) => page === totalPage

function Pagination(props: PaginationProps) {
  return (
    <ButtonGroup>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Previous page"
        disabled={isFirstPage(props.page)}
        onClick={props.onPrev}
      />
      <IconButton
        icon={<ArrowForwardIcon />}
        aria-label="Next page"
        disabled={isLastPage(props.page, props.totalPage)}
        onClick={props.onNext}
      />
    </ButtonGroup>
  )
}

export default Pagination
