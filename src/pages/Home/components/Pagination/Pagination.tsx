import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text } from '@chakra-ui/react'

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
    <HStack>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Previous page"
        disabled={isFirstPage(props.page)}
        onClick={props.onPrev}
      />
      <Text>{props.page}</Text>
      <IconButton
        icon={<ArrowForwardIcon />}
        aria-label="Next page"
        disabled={isLastPage(props.page, props.totalPage)}
        onClick={props.onNext}
      />
    </HStack>
  )
}

export default Pagination
