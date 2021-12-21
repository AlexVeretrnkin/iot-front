import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import BaseTable from '../../components/Table';
import { FC } from 'react';
import { MeterQueryModel } from '../../models/query/meter-query.model';
import { useGetMetersQuery } from '../../store/meters';
import { MeterModel } from '../../models/meter.model';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('dfd', 356, 16.0, 49, 3.9),
    createData('sadf', 356, 16.0, 49, 3.9),
    createData('df', 356, 16.0, 49, 3.9),
    createData('dfgdgd', 356, 16.0, 49, 3.9),
];

const TableItem: FC<{data: MeterModel}> = ({data}) => <TableRow
    key={data.id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
    <TableCell component="th" scope="row">
        {data.name}
    </TableCell>
    <TableCell align="right">{data.type}</TableCell>
    <TableCell align="right">{data.serial}</TableCell>
    <TableCell align="right">{data.position}</TableCell>
    <TableCell align="right">{data.key}</TableCell>
</TableRow>

function Meters() {
    //@ts-ignore
    const { data, error, isLoading } = useGetMetersQuery({
        page: 0,
        offset: 10
    } as MeterQueryModel);


    return (
        <BaseTable
            tableHead={['Назва', 'Тип', 'Серійний номер', 'Розташування', 'Ключ']}
            tableData={data?.data}
            Item={TableItem}
            handleChangePage={console.log}
            handleChangeRowsPerPage={console.log}
            page={0}
            rowsPerPage={5}
        />
    );
}

export default Meters;

