import { render, screen } from '@testing-library/react'
import { mock, MockColumns, MockRow } from './mock'
import { Table } from './Table'

describe('<Table />', () => {
  render(<Table<MockColumns, Array<MockRow>> {...mock.table} />)
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
  })
})
