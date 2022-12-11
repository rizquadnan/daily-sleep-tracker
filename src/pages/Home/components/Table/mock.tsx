import { TableProps } from './Table'
import { Column, Row } from './tableEntity'
import TableActions from './TableActions'

const chart = [
  {
    label: 'Series 1',
    data: [
      { hours: 7, date: new Date('12/07/22') },
      { hours: 5, date: new Date('12/08/22') },
      { hours: 6, date: new Date('12/09/22') },
      { hours: 8, date: new Date('12/10/22') },
    ],
  },
]

const table: TableProps<Column, Array<Row>> = {
  columns: ['date', 'sleepStart', 'sleepEnd', 'totalDuration', 'actions'],
  rows: [
    {
      key: '1',
      date: '13/12/21',
      sleepStart: '22:00',
      sleepEnd: '05:00',
      totalDuration: '07:00',
      actions: (
        <TableActions
          onEdit={() => alert('Edit')}
          onDelete={() => alert('Delete')}
        />
      ),
    },
    {
      key: '2',
      date: '14/12/21',
      sleepStart: '23:00',
      sleepEnd: '05:20',
      totalDuration: '06:20',
      actions: (
        <TableActions
          onEdit={() => alert('Edit')}
          onDelete={() => alert('Delete')}
        />
      ),
    },
    {
      key: '3',
      date: '15/12/21',
      sleepStart: '20:00',
      sleepEnd: '04:00',
      totalDuration: '08:00',
      actions: (
        <TableActions
          onEdit={() => alert('Edit')}
          onDelete={() => alert('Delete')}
        />
      ),
    },
  ],
}

export const mock = {
  chart,
  table,
}
