import { Box, Flex, VStack } from '@chakra-ui/react'
import { useMockSleeps } from 'api'
import React, { useState } from 'react'
import { AxisLinearOptions, Chart, ChartValue } from 'react-charts'
import Pagination from '../components/Pagination/Pagination'

type ChartDatum = {
  hours: number
  date: Date
}

function toMmDdYy(ddMmYy: string) {
  const dateParts = ddMmYy.split('-')
  return `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`
}

const PAGE_SIZE = 5

export function ChartGuestModeContainer() {
  const [page, setPage] = useState(1)
  const { data, totalPage } = useMockSleeps({ page, pageSize: PAGE_SIZE })

  const primaryAxis = React.useMemo<AxisLinearOptions<ChartDatum>>(
    () => ({
      getValue: (datum) => (datum.date as unknown) as ChartValue<number>,
    }),
    [],
  )
  const secondaryAxes = React.useMemo<AxisLinearOptions<ChartDatum>[]>(
    () => [
      {
        getValue: (datum) => datum.hours,
      },
    ],
    [],
  )

  const validTotalPage = totalPage ?? 1

  return (
    <VStack alignItems="stretch">
      <Box minH={406}>
        <Chart
          options={{
            data: [
              {
                label: 'Series 1',
                data: data
                  ? data.map((sleep) => ({
                      hours: Math.round(sleep.sleepDuration / 60),
                      date: new Date(toMmDdYy(sleep.date)),
                    }))
                  : [],
              },
            ],
            primaryAxis,
            secondaryAxes,
            tooltip: false,
          }}
        />
      </Box>
      <Flex justifyContent="flex-end">
        <Pagination
          page={page}
          totalPage={validTotalPage}
          onNext={() => setPage((prev) => prev + 1)}
          onPrev={() => setPage((prev) => prev - 1)}
        />
      </Flex>
    </VStack>
  )
}

export default ChartGuestModeContainer
