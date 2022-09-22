import React from 'react'
import { AxisLinearOptions, Chart } from 'react-charts'
import { mock } from '../components'

function ChartContainer() {
  const primaryAxis = React.useMemo<
    AxisLinearOptions<typeof mock['chart'][number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => Number(datum.primary),
    }),
    [],
  )
  const secondaryAxes = React.useMemo<
    AxisLinearOptions<typeof mock['chart'][number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    [],
  )
  return (
    <Chart
      options={{
        data: mock.chart,
        primaryAxis,
        secondaryAxes,
        tooltip: false,
      }}
    />
  )
}

export default ChartContainer
