import { Box, Flex, VStack } from '@chakra-ui/react'
import { useMockSleeps } from 'api'
import { EmptyData } from 'components'
import React, { useState } from 'react'
import { AxisLinearOptions, Chart, ChartValue } from 'react-charts'
import Pagination from '../components/Pagination/Pagination'
import { ChartAndPagination } from './ChartAndPagination'

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

  if (data.length === 0) {
    return <EmptyData />
  }

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

export default ChartGuestModeContainer
