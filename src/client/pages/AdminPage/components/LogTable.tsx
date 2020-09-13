import React, { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
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

type Props = {
    data?: any;
}

const LogTable: React.FunctionComponent<Props> = ({ data }) => {
    const [log, setLog] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getLogs = async (checkOutLogs: string) => {
            const temp = await getLogInfo(checkOutLogs);
            alert(JSON.stringify(temp.data));
            
            setLog(JSON.stringify(temp.data));
            setLoading(false);
        }
        getLogs(data);
      }, [])

    // async function helper(checkOutLogs: string) {
    //     const { data } = await getLogInfo(checkOutLogs);
    //     return temp;
    // }

    // function asdf(checkOutLogs: string) {
    //     const temp = helper(checkOutLogs);
    //     temp.then(data => {
    //         alert(JSON.stringify(data.data))
    //     });

    //     return (
    //         <div>
    //             FASDFSFDUI
    //         </div>
    //     );
    // }


    if (loading) return (
        <div className="text-center w-100">
            <h3 className="my-2"> Loading Items... </h3>
            <Loading />
        </div>
    )

    return (
        <div>
            {log}
        </div>
    );
}

export default LogTable;