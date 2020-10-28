import React from 'react';
import { Table, PaginationItem, PaginationLink, Pagination, Badge} from 'reactstrap';
import { Rounded } from '~/styles';
import { InventoryItem } from '@Shared/Types'
import columns from './RequestTableColumns';
import { useTable, useExpanded, Row, usePagination } from 'react-table';
import ColumnEditor from './ColumnEditor';
import { removeItem } from '~/data/AdminApi';
import styled from 'styled-components';
import Button from '~/components/Button';
import TablePagination from '~/pages/AdminPage/components/TablePagination';
import { CheckOutRequest } from '~/../shared/api/Requests';

type Props = {
  data?: Array<CheckOutRequest>;
}

const RequestTable: React.FunctionComponent<Props> = ({data}) => {

    async function onClick(row: Row<CheckOutRequest>) {
        await removeItem(row.original.firstName);
        // TODO: remove actual row -- rerender pages? 
      } 

  const renderRowSubComponent = React.useCallback(
    ({ row }: {row: Row<CheckOutRequest>}) => (
      <pre
        style={{
          fontFamily: 'Lato',
        }} 
      >     
        <div className="container-fluid">

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Items:
            </div>
            <div className="col-10">
              <code>{row.original.items != undefined ? row.original.items.map((value) =>  
                    <Badge color="primary" pill>
                      {value}
                    </Badge>) : 'None'}</code>
            </div>
          </div>
          
          <div className="row">
            <div className="col-6 tesc-blue">
              <h3><code>{row.original.firstName}</code></h3>
            </div>
          </div>

          <div className="row">
            <div className="col-6 tesc-blue">
              <h3><code>{row.original.lastName}</code></h3>
            </div>
          </div>
          <hr />

          <div className="row mt-2">
            <div className="col-2 tesc-blue">
              Email:
            </div>
            <div className="col-3 text-center">
              <code>{row.original.email != undefined ? row.original.email : "N/A"}</code>
            </div>
            <div className="col-1">

            </div>
            <div className="row mt-2">
              <div className="col-2 tesc-blue">
                Organization Name:
              </div>
            <div className="col-3 text-center">
              <code>{row.original.organizationName != undefined ? row.original.organizationName : "N/A"}</code>
            </div>
            <div className="col-1"></div>

          </div>
            <div className="col-2 tesc-blue">
                Approved By:
              </div>
              <div className="col-3 text-center">
                <code>{row.original.approvedBy != undefined ? row.original.approvedBy : "N/A"}</code>
            </div>        
            <div className="col-2 tesc-blue">
              Purpose:
            </div>
            <div className="col-3 text-center">
              <code>{row.original.purpose != undefined ? row.original.purpose : "N/A"}</code>
            </div>
            <div className="col-2 tesc-blue">
              Date Needed By:
            </div>
            <div className="col-3 text-center">
              <code>{row.original.dateNeededBy != undefined ? row.original.dateNeededBy : "N/A"}</code>
            </div>
          </div>
          
          <hr />

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Created At:
            </div>
            <div className="col-6">
              <code>{row.original.createdAt != undefined ? 
                      new Date(row.original.createdAt.seconds * 1000).toString() : "Unrecorded"}</code>
            </div>
          </div>

          </div>
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
  } = useTable<CheckOutRequest>({ 
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
      <TablePagination 
        pageIndex={pageIndex}
        pageCount={pageCount}
        previousPage={previousPage}
        nextPage={nextPage}
        gotoPage={gotoPage}
      />
    </>
  );
}

export default RequestTable;