import React from 'react';
import { InventoryItem } from '@Shared/Types'
import { Column } from 'react-table';


const columns: Array<Column<InventoryItem>> = [
  {
    Header: () => null, // No header
    id: 'expander', // It needs an ID
    Cell: ({ row }) => (
      // Use Cell to render an expander for each row.
      // We can use the getToggleRowExpandedProps prop-getter
      // to build the expander.
      <span {...(row as any).getToggleRowExpandedProps()}>
        {(row as any).isExpanded ? '👇' : '👉'}
      </span>
    ),
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Created By',
    accessor: 'createdBy'
  },
  {
    Header: 'Created At',
    accessor: 'createdAt'
  },
  {
    Header: 'For Rent',
    accessor: d => d.forRent.toString(),
  },
  {
    Header: 'Updated At',
    accessor: 'updatedAt'
  },
  {
    Header: 'Quantity',
    accessor: 'quantity'
  }]

export default columns;