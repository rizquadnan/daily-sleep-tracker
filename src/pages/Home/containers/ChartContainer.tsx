import { Skeleton } from '@chakra-ui/react'
import { useSleeps } from 'api'
import { useAuth } from 'providers'
import React from 'react'
import { AxisLinearOptions, Chart, ChartValue } from 'react-charts'

type ChartDatum = {
  hours: number
  date: Date
}

function toMmDdYy(ddMmYy: string) {
  const dateParts = ddMmYy.split('-')
  return `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`
}
export function ChartContainer() {
  const auth = useAuth()
  const { data, state } = useSleeps({
    shouldFetch: auth.isAuthenticated && auth.user ? true : false,
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
  )
}

export default ChartContainer
