import { InventoryItem } from '@Shared/Types'
import { Column } from 'react-table';
type ColumnType = {
  Header: string;
  accessor: Column<InventoryItem>["accessor"],
  Cell?: Column["Cell"]
}

const columns: Array<ColumnType> = [
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