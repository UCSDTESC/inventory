import React, { useEffect, useState } from 'react';
import { CheckOutItem } from '~/../shared/api/Requests';
import Loading from '~/components/Loading';
import { getLogInfo } from '~/data/AdminApi';

type Props = {
    data?: any;
}

const LogTable: React.FunctionComponent<Props> = ({ data }) => {
    const [log, setLog] = useState<Array<CheckOutItem>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getLogs = async (checkOutLogs: Array<string>) => {
            let store = [];
            for (let checkOutLog of checkOutLogs) {
                const temp = await getLogInfo(checkOutLog);
                store.push(temp.data);
            }
            setLog(store as any);
            setLoading(false);
        }
        getLogs(data);
    }, [])

    if (loading) return (
        <div className="text-center w-100">
            <h3 className="my-2"> Loading Items... </h3>
            <Loading />
        </div>
    )

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