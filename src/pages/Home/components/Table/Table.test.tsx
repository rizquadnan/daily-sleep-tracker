import { render, screen } from '@testing-library/react'
import { ReactElement } from 'react'
import { mock } from './mock'
import { Table } from './Table'
import { Column, Row } from './tableEntity'

describe('<Table />', () => {
  render(<Table<Column, Array<Row>> {...mock.table} />)
  it('renders without crashing', () => {
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  describe('table head', () => {
    const columnHeads = screen.getAllByRole('columnheader')
    test('render the same amount of length as defined in props', () => {
      expect(columnHeads).toHaveLength(mock.table.columns.length)
    })

    test('render the order of columns properly', () => {
      mock.table.columns.forEach((column, index) => {
        expect(columnHeads[index].textContent).toBe(column)
      })
    })
  })

  describe('table body', () => {
    const tableRows = screen.getAllByRole('row').slice(1)
    test('render the same amount of rows as defined in props', () => {
      expect(tableRows).toHaveLength(mock.table.rows.length)
    })

    test('render the order of rows properly', () => {
      mock.table.rows.forEach((row, index) => {
        expect(tableRows[index].childNodes[0].textContent).toBe(row.date)
      })
    })

    test('render each row that has its cell in correct order', () => {
      mock.table.rows.forEach((row, rowIndex) => {
        mock.table.columns.forEach((column, columnIndex) => {
          const isTextTypeCell =
            tableRows[rowIndex].childNodes[columnIndex].childNodes[0]
              .nodeName === '#text'

          if (!isTextTypeCell) {
            return
          }
          expect(tableRows[rowIndex].childNodes[columnIndex].textContent).toBe(
            row[column],
          )
        })
      })
    })

    test('render a custom cell', () => {
      render(
        <Table<['custom'], Array<{ key: string; custom: ReactElement }>>
          columns={['custom']}
          rows={[
            {
              key: '1',
              custom: <button>Custom</button>,
            },
          ]}
        />,
      )

      expect(screen.getByRole("button", { name: "Custom" })).toBeInTheDocument();
    })
  })
})
