import { FC } from 'react';
import * as React from 'react';

export type BaseTableProps<T> = {
    tableHead: string[];
    tableData: T[];
    Item: FC<{ data: T }>;
    handleChangePage: (event?: React.MouseEvent<HTMLButtonElement> | null, page?: number) => void;
    handleChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    rowsPerPage: number;
    page: number;
}
