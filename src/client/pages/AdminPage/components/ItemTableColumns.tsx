import React from 'react';
import { InventoryItem, UserRecord } from '@Shared/Types'
import { Column } from 'react-table';
import ProfileCard from '~/components/ProfileCard';

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
    accessor: ({createdBy}) => <span><ProfileCard src={(createdBy as UserRecord).photoURL}/> {(createdBy as UserRecord).displayName}</span>
  },
  {
    Header: 'For Rent',
    accessor: d => d.forRent.toString(),
  },
  {
    Header: 'Quantity',
    accessor: 'quantity'
  },
  {
    Header: 'Tags',
    accessor: d => d.tags?.map(t => <span className="badge badge-dark mr-2">{t}</span>)
  }]

export default columns;