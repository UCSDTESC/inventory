import React from 'react';
import { Table } from 'reactstrap';
import { Rounded } from '~/styles';
import { InventoryItem } from '@Shared/Types'
import columns from './ItemTableColumns';
import { useTable, useExpanded, Row } from 'react-table';

type Props = {
  data?: Array<InventoryItem>;
}

const ItemTable: React.FunctionComponent<Props> = ({data}) => {

  const renderRowSubComponent = React.useCallback(
    ({ row }: {row: Row<InventoryItem>}) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{row.values.name}</code>
      </pre>
    ),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable<InventoryItem>({ columns, data }, useExpanded)

  return (
    <Rounded as={Table} className="bg-white border-top-0" {...getTableProps()} responsive>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="tesc-blue text-center">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <React.Fragment key={i}>
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="text-center">{cell.render('Cell')}</td>
                  )
                })}
              </tr>
              {/*
                  If the row is in an expanded state, render a row with a
                  column that fills the entire length of the table.
                */}
              {(row as any).isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {/*
                        Inside it, call our renderRowSubComponent function. In reality,
                        you could pass whatever you want as props to
                        a component like this, including the entire
                        table instance. 
                      */}
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          )
        })}
      </tbody>
    </Rounded>
  );
}

export default ItemTable;