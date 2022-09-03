import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { ReactElement } from 'react'

export type TableProps<Columns, Rows> = {
  rows: Rows
  columns: Columns
}

type ColumnValues<T> = T extends 'key'
  ? string : T extends string ? string | ReactElement : never;

type RowValues<ColumnsKeys extends string> = { [ K in ColumnsKeys]: ColumnValues<K>};

export function Table<
  Columns extends string[],
  Rows extends Array<RowValues<'key' | Columns[number]>>
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
              {props.columns.map((column, columnIndex) => (
                <Td key={`tbody-row${rowIndex}-column${columnIndex}-${column}`}>
                  {row[column as Columns[number]]}
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
