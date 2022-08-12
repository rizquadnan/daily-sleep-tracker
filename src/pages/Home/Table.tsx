import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

export type TableProps<Columns, Rows> = {
  rows: Rows
  columns: Columns
}

export function Table<
  Columns extends string[],
  Rows extends Array<Record<Columns[number] | 'key', string>>
>(props: TableProps<Columns, Rows>) {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {props.columns.map((column, index) => (
              <Th key={`thead-${index}-${column}`}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {props.rows.map((row, rowIndex) => (
            <Tr key={row.key}>
              {props.columns.map((key, columnIndex) => (
                <Td key={`tbody-row${rowIndex}-column${columnIndex}-${key}`}>
                  {row[key as Columns[number]]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}

export default Table
