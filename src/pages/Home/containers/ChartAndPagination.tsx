import { Box, Flex, VStack } from '@chakra-ui/react'
import { Sleep } from 'models'
import { AxisLinearOptions, Chart } from 'react-charts'
import { Pagination } from '../components'

type ChartDatum = {
  hours: number
  date: Date
}

type ChartAndPaginationProps = {
  primaryAxis: AxisLinearOptions<ChartDatum>
  secondaryAxes: AxisLinearOptions<ChartDatum>[]
  data: Sleep[]
  page: number
  totalPage: number
  onNextPage: () => void
  onPrevPage: () => void
}

function toMmDdYy(ddMmYy: string) {
  const dateParts = ddMmYy.split('-')
  return `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`
}

export function ChartAndPagination(props: ChartAndPaginationProps) {
  return (
    <VStack alignItems="stretch">
      <Box minH={406}>
        <Chart
          options={{
            data: [
              {
                label: 'Series 1',
                data: props.data
                  ? props.data.map((sleep) => ({
                      hours: Math.round(sleep.sleepDuration / 60),
                      date: new Date(toMmDdYy(sleep.date)),
                    }))
                  : [],
              },
            ],
            primaryAxis: props.primaryAxis,
            secondaryAxes: props.secondaryAxes,
            tooltip: false,
          }}
        />
      </Box>
      <Flex justifyContent="flex-end">
        <Pagination
          page={props.page}
          totalPage={props.totalPage}
          onNext={props.onNextPage}
          onPrev={props.onPrevPage}
        />
      </Flex>
    </VStack>
  )
}
