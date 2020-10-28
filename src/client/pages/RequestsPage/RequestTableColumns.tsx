import React from 'react';
import { InventoryItem, UserRecord } from '@Shared/Types'
import { Column, Row } from 'react-table';
import ProfileCard from '~/components/ProfileCard';
import { BORDER_RADIUS } from '~/styles/constants';
import { CheckOutRequest} from '~/../shared/api/Requests';

const Boolean: React.FunctionComponent<{value?: boolean}> = (props) => (
  <span>{props.value ? '✅' : '❌'}</span>
)

const columns: Array<Column<CheckOutRequest>> = [
  {
    Header: '', 
    id: 'expander', // It needs an ID
    Cell: ({ row }: {row: Row<CheckOutRequest> }) => (
      // Use Cell to render an expander for each row.
      // We can use the getToggleRowExpandedProps prop-getter
      // to build the expander.
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? '👇' : '👉'}
      </span>
    ),
  },
  {
    Header: 'First Name',
    id: 'name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    id: 'name',
    accessor: 'lastName'
  },
  {
    Header: 'Organization Name',
    id: 'name',
    accessor: 'organizationName'
  },
  {
    Header: 'Email',
    id: 'email',
    accessor: 'email'
  },
  {
    Header: 'Items',
    id: 'items',
    accessor: d => d.items?.map(t => <span className="badge badge-dark mr-2">{t}</span>)
  },

]

export default columns;