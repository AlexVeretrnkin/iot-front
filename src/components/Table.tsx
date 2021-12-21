import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import * as React from 'react';
import { Table, TablePagination } from '@mui/material';
import { BaseTableProps } from '../models/props/base-table.props';

function BaseTable<T> (
    {
        tableHead,
        tableData,
        Item,
        handleChangePage,
        handleChangeRowsPerPage,
        rowsPerPage = 5,
        page = 0,
        totalCount,
        handleItemDeletion,
        handleItemUpdate,
    }: BaseTableProps<T>,
) {

    console.log('table');

    return (
        <Paper sx={{ width : '100%' }}>
            <TableContainer>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                tableHead.map((name, idx) => <TableCell key={name} align={idx === 0 ? 'left' : 'right'}>{name}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData ? tableData.map(
                                (row, idx) =>
                                    <Item
                                        key={idx}
                                        data={row}
                                        handleItemDeletion={handleItemDeletion}
                                        handleItemUpdate={handleItemUpdate}
                                    />,
                            ) : <TableRow><TableCell>'Loading...'</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default React.memo(BaseTable, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
