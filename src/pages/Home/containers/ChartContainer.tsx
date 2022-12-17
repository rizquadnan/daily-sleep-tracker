import { Box, Flex, Skeleton, VStack } from '@chakra-ui/react'
import { useSleeps } from 'api'
import { useAuth } from 'providers'
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

export function ChartContainer() {
  const auth = useAuth()
  const [page, setPage] = useState(1)
  const { data, state } = useSleeps({
    shouldFetch: auth.isAuthenticated && auth.user ? true : false,
    page,
    pageSize: PAGE_SIZE,
    userId: auth.user ? auth.user.id : undefined,
  })

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

  if (state === 'loading' || state === 'idle') {
    return <Skeleton isLoaded={false} h={300} />
  }

  if (state === 'error') {
    return <div>Error</div>
  }

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
          totalPage={2}
          onNext={() => setPage((prev) => prev + 1)}
          onPrev={() => setPage((prev) => prev - 1)}
        />
      </Flex>
    </VStack>
  )
}

export default ChartContainer
