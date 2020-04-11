import React from 'react';
import { InventoryItem, UserRecord } from '@Shared/Types'
import { Column, Row } from 'react-table';
import ProfileCard from '~/components/ProfileCard';
import { BORDER_RADIUS } from '~/styles/constants';

const columns: Array<Column<InventoryItem>> = [
  {
    Header: '', 
    id: 'expander', // It needs an ID
    Cell: ({ row }: {row: Row<InventoryItem> }) => (
      // Use Cell to render an expander for each row.
      // We can use the getToggleRowExpandedProps prop-getter
      // to build the expander.
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? '👇' : '👉'}
      </span>
    ),
  },
  {
    Header: 'Item Photo',
    id: 'picture',
    accessor: (d) => <img src={d?.pictureUrl} style={{width: '5rem', borderRadius: BORDER_RADIUS}} />
  },
  {
    Header: 'Name',
    id: 'name',
    accessor: 'name'
  },
  {
    Header: 'Created By',
    id: 'createdBy',
    accessor: ({createdBy}) => <span><ProfileCard src={(createdBy as UserRecord).photoURL}/> {(createdBy as UserRecord).displayName}</span>
  },
  {
    Header: 'For Rent',
    id: 'forRent',
    accessor: d => d.forRent.toString(),
  },
  {
    Header: 'Quantity',
    id: 'quantity',
    accessor: 'quantity'
  },
  {
    Header: 'Tags',
    id: 'tags',
    accessor: d => d.tags?.map(t => <span className="badge badge-dark mr-2">{t}</span>)
  },
  {
    Header: 'Serial Numbers',
    id: 'serials',
    accessor: d => d.serials?.map(t => <span className="badge badge-dark mr-2">{t}</span>)
  }
]

export default columns;