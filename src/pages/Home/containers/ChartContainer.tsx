import { Box, Flex, Image, Skeleton, Text, VStack } from '@chakra-ui/react'
import { useSleeps } from 'api'
import { useAuth } from 'providers'
import React, { useState } from 'react'
import { AxisLinearOptions, Chart, ChartValue } from 'react-charts'
import Pagination from '../components/Pagination/Pagination'
import { EmptyData, ErrorState } from 'components'
import { ChartAndPagination } from './ChartAndPagination'

type ChartDatum = {
  hours: number
  date: Date
}

const PAGE_SIZE = 5

export function ChartContainer() {
  const auth = useAuth()
  const [page, setPage] = useState(1)
  const { data, state, totalPage, error } = useSleeps({
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
    return <ErrorState errorMessage={error ?? ''} />
  }

  if (data === null) {
    return <EmptyData />
  }

  const validTotalPage = totalPage ?? 1

  return (
    <ChartAndPagination
      primaryAxis={primaryAxis}
      secondaryAxes={secondaryAxes}
      data={data}
      page={page}
      totalPage={validTotalPage}
      onNextPage={() => setPage((prev) => prev + 1)}
      onPrevPage={() => setPage((prev) => prev - 1)}
    />
  )
}

export default ChartContainer
