import React, { useEffect, useState } from 'react';
import { InventoryItem } from '@Shared/Types';
import * as admin from 'firebase-admin';
import { CheckOutRequest } from '@Shared/api/Requests';
import { Table, PaginationItem, PaginationLink, Pagination, Badge} from 'reactstrap';
import { SuccessResponse, GetItemsResponse } from '@Shared/api/Responses';
import { useTable, useExpanded, Row, usePagination } from 'react-table';
import AdminContext from '~/data/admin/context';
import ItemTable from '~/pages/AdminPage/components/ItemTable';
import RequestTable from './RequestTable'
import { getRequests } from '~/data/AdminApi';
import Loading from '~/components/Loading';





const RequestsPage: React.FC = (props) => {

  const [requests, setRequests] = useState<Array<CheckOutRequest>>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRequests = async () => {
      const {data} = await getRequests();
      setRequests(data.requests);
      setLoading(false);
    }
    fetchRequests();
  }, [])

  if (loading) return (
    <div className="text-center w-100">
      <h3 className="my-2"> Loading Requests... </h3>
      <Loading />
    </div>
  )

  return (
    <div className="container">
      requests page
      <div className="row mt-3">
        <div className="col">
          <RequestTable data={requests} />
        </div>
      </div>
    </div>

  );
}

export default RequestsPage;
