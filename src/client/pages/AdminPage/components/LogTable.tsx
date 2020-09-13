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
import { CheckOutItem } from '~/../shared/api/Requests';
import { GetCheckOutItemResponse } from '~/../shared/api/Responses';

type Props = {
    data?: any;
}

const LogTable: React.FunctionComponent<Props> = ({ data }) => {
    const [log, setLog] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getLogs = async (checkOutLogs: Array<string>) => {
            let store = [];
            for (let checkOutLog of checkOutLogs) {
                const temp = await helper(checkOutLog);
                store.push(temp.data);
            }
            setLog(store);
            setLoading(false);
        }
        getLogs(data);
    }, [])

    async function helper(entry: string) {
        const temp = await getLogInfo(entry);
        return temp;
    }

    if (loading) return (
        <div className="text-center w-100">
            <h3 className="my-2"> Loading Items... </h3>
            <Loading />
        </div>
    )

    const fuck = [1, 4, 5];

    return (
        <table className="col-6">
            <tr>
                <td>Quantity</td>
                <td>Returned</td>
            </tr>
            {log.map(value => {
                return (
                    <tr>
                        <td>{JSON.stringify(value.quantity)}</td>
                        <td>{JSON.stringify(value.returned)}</td>
                    </tr>
                )
            })}
        </table>
    );
}

export default LogTable;