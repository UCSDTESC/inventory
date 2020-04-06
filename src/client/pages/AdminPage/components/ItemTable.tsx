import React from 'react';
import { Table, PaginationItem, PaginationLink, Pagination } from 'reactstrap';
import { Rounded } from '~/styles';
import { InventoryItem } from '@Shared/Types'
import columns from './ItemTableColumns';
import { useTable, useExpanded, Row, usePagination } from 'react-table';
import ColumnEditor from './ColumnEditor';

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
    page,
    pageCount,
    prepareRow,
    visibleColumns,
    allColumns,
    gotoPage,
    previousPage,
    nextPage,
    state: {
      pageIndex,      
    }
  } = useTable<InventoryItem>({ 
    columns, 
    data, 
    initialState: {
      hiddenColumns: [
        'tags',
        'serials'
      ],
      pageIndex: 0,
      pageSize: 5
    },
  }, 
  useExpanded, 
  usePagination);

  return (
    <>
      <ColumnEditor allColumns={allColumns} />
      <Rounded 
        as={Table} 
        className="bg-white border-top-0" 
        {...getTableProps()} 
        responsive>
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
          {page.map((row, i) => {
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
                {row.isExpanded ? (
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
      {/* TODO: Style this to be rounded and tesc-blue */}
      <Pagination className="w-100 d-flex align-items-center">
        <PaginationItem>
          <PaginationLink previous disabled={pageIndex == 0} onClick={previousPage} />
        </PaginationItem>
        {[...Array(pageCount)].map((page, i) => (
          <PaginationItem active={i === pageIndex} key={i}>
            <PaginationLink onClick={e => gotoPage(i)} href="#">
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink next disabled={pageIndex == pageCount - 1} onClick={nextPage} />
        </PaginationItem>
      </Pagination>
    </>
  );
}

export default ItemTable;