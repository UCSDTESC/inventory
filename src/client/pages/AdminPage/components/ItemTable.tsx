import React from 'react';
import { Table, PaginationItem, PaginationLink, Pagination, Badge } from 'reactstrap';
import { Rounded } from '~/styles';
import { InventoryItem } from '@Shared/Types'
import columns from './ItemTableColumns';
import { useTable, useExpanded, Row, usePagination } from 'react-table';
import ColumnEditor from './ColumnEditor';
import { getLogInfo, removeItem } from '~/data/AdminApi';
import styled from 'styled-components';
import Button from '~/components/Button';
import TablePagination from './TablePagination';
import LogTable from './LogTable';

type Props = {
  data?: Array<InventoryItem>;
}

const ItemTable: React.FunctionComponent<Props> = ({ data }) => {

  async function onClick(row: Row<InventoryItem>) {
    await removeItem(row.original.id);
    // TODO: remove actual row -- rerender pages? 
  }

  function grabImage(picURL: string) {
    if (picURL == undefined || picURL == '') {
      return;
    } else {
      return (
        <img alt='Item Image' src={picURL} style={{ "width": "100%" }}></img>
      );
    }

  }

  const renderRowSubComponent = React.useCallback(
    ({ row }: { row: Row<InventoryItem> }) => (
      <pre
        style={{
          fontFamily: 'Lato',
        }}
      >
        <div className="container-fluid">

          <div className="row">
            <div className="col-6 tesc-blue">
              <h3><code>{row.original.name}</code></h3>
            </div>
          </div>

          <div className="row">
            {row.original.pictureUrl != undefined && row.original.pictureUrl != "" ?
              <div className="col-3"> {grabImage(row.original.pictureUrl)} </div>
              : ""}

            <div className="col-2 tesc-blue">
              Description:
            </div>
            <div className="col-7">
              <code>{row.original.description != undefined ? row.original.description : "N/A"}</code>
            </div>
          </div>

          <hr />

          <div className="row mt-2">
            <div className="col-2 tesc-blue">
              ID:
            </div>
            <div className="col-3 text-center">
              <code>{row.original.id != undefined ? row.original.id : "N/A"}</code>
            </div>
            <div className="col-1"></div>

            <div className="col-2 tesc-blue">
              For Rent:
            </div>
            <div className="col-3 text-center">
              <code>{row.original.forRent ? "Yes" : "No"}</code>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Quantity:
            </div>
            <div className="col-3 text-center">
              <code>{row.original.quantity}</code>
            </div>
            <div className="col-1"></div>

            <div className="col-2 tesc-blue">
              Price:
            </div>
            <div className="col-3 text-center">
              <code>{row.original.price != undefined ? row.original.price : "N/A"}</code>
            </div>
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Tags:
            </div>
            <div className="col-10">
              <code>{row.original.tags != undefined ? row.original.tags.map((value) =>
                <Badge color="primary" pill>
                  {value}
                </Badge>) : 'None'}</code>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Serials:
            </div>

            <div className="col-10">
              <code>{row.original.serials != undefined ? row.original.serials.map((value) =>
                <Badge color="primary" pill>
                  {value}
                </Badge>) : 'N/A'}</code>
            </div>
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Last updated:
            </div>
            <div className="col-6">
              <code>{row.original.updatedAt != undefined ?
                new Date(row.original.updatedAt.seconds * 1000).toString() : "Unrecorded"}</code>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Created At:
            </div>
            <div className="col-6">
              <code>{row.original.createdAt != undefined ?
                new Date(row.original.createdAt.seconds * 1000).toString() : "Unrecorded"}</code>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Receipt:
            </div>
            <div className="col-6">
              <code>{row.original.receiptUrl != undefined ?
                grabImage(row.original.receiptUrl) : "N/A"}</code>
            </div>
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-2 tesc-blue">
              Checkout Logs:
            </div>
            <div className="col-6">
              <code>{row.original.checkOutLogs != undefined ?
                <LogTable data={row.original.checkOutLogs} /> : 'None'}</code>
            </div>
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-3">
              <Button type='submit' onClick={e => onClick(row)}>
                Remove
              </Button>
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

export default ItemTable;