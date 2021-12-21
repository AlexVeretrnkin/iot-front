import { FC } from 'react';
import * as React from 'react';

export type BaseTableProps<T> = {
    tableHead: string[];
    tableData: T[];
    Item: FC<{
        data: T,
        handleItemDeletion?: (id: string) => void;
        handleItemUpdate?: (item: T) => void
    }>;
    handleChangePage: (event?: React.MouseEvent<HTMLButtonElement> | null, page?: number) => void;
    handleChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    rowsPerPage: number;
    page: number;
    totalCount: number;
    handleItemDeletion?: (id: string) => void;
    handleItemUpdate?: (item: T) => void
}
