import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FC, useEffect, useRef, useState } from 'react';
import {
    Button, Card, CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Fab,
    IconButton,
    Stack, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { ReadingModel } from '../../../models/reading.model';
import BaseTable from '../../../components/Table';
import { Text } from '../../../components/form/Text';
import YesNoModal from '../../../components/modals/yes-no-modal';
import { ReadingQueryModel } from '../../../models/query/reading-query.model';
import { useCreateReadingMutation, useGetReadingsQuery, useRemoveReadingMutation } from '../../../store/readings.api';
import { useRouter } from 'next/router';
import { getDate, getFromTo, getTime } from '../../../core/date-formater';
import { DateTime } from '../../../components/form/DateTime';
import { isBrowser } from '@emotion/utils';

const TableItem: FC<{
    data: ReadingModel,
    handleItemDeletion?: (id: string) => void;
    handleItemUpdate?: (item: ReadingModel) => void
}> = ({ data, handleItemDeletion, handleItemUpdate }) => {
    const date = new Date(data.date);

    return (
        <TableRow
            key={data.id}
            sx={{ '&:last-child td, &:last-child th' : { border : 0 } }}
        >
            <TableCell component="th" scope="row">
                {getDate(date)}
            </TableCell>
            <TableCell align="right">
                {getTime(date)}
            </TableCell>
            <TableCell align="right">{data.value}</TableCell>
            <TableCell align="right" width={50}>
                <Stack direction="row" justifyContent="flex-end" spacing={0}>
                    <IconButton aria-label="delete" onClick={_ => handleItemDeletion(data.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

function Readings () {
    const router = useRouter();
    const { meterId } = router.query;

    const [query, setQuery] = useState<ReadingQueryModel>(null);

    const [createMeterModal, setCreateMeterModal] = useState(false);

    const [yesNoOpen, setYesNoOpen] = useState(false);

    const { control, getValues, setValue, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data, getValues());

    const { data, error, isLoading } = useGetReadingsQuery(query, {
        skip: !query?.meterId
    });
    const [deleteReading, { isLoading : isDeleting }] = useRemoveReadingMutation();
    const [createReading, { isLoading : isCreating }] = useCreateReadingMutation();

    const readingToDeleteId = useRef(null);

    useEffect(() => {
        if (meterId) {
            setQuery({
                page    : 0,
                offset  : 5,
                meterId : meterId as string,
            })
        }
    }, [router.query]);

    const handleClose = () => {
        const reading: ReadingModel = getValues() as ReadingModel;

        createReading({
            ...reading,
            meterId : meterId as string,
        });

        setCreateMeterModal(false);
    };

    const handleDelete = (id) => {
        readingToDeleteId.current = id;

        setYesNoOpen(true);
    };

    const handleQueryChange = (newQuery: Partial<ReadingQueryModel>) => {
        setQuery({
            ...query,
            ...newQuery,
        });
    };

    return (
        <Container>
            {
                data?.data?.length ?
                <Card variant="outlined" sx={{marginBottom: '24px'}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h5" component="div">
                                Фільтрація
                            </Typography>
                            <Stack spacing={1} direction="row">
                                <Button
                                    sx={{ width : '1/3' }}
                                    onClick={() => {
                                        const [from, to] = getFromTo('hour');
                                        setValue('from', from);
                                        setValue('to', to);
                                    }}
                                    variant={'outlined'}>
                                    Година
                                </Button>
                                <Button
                                    sx={{ width : '1/3' }}
                                    onClick={() => {
                                        const [from, to] = getFromTo('day');
                                        setValue('from', from);
                                        setValue('to', to);
                                    }}
                                    variant={'outlined'}>
                                    День
                                </Button>
                                <Button
                                    sx={{ width : '1/3' }}
                                    onClick={
                                        () => {
                                            const [from, to] = getFromTo('week');
                                            setValue('from', from);
                                            setValue('to', to);
                                        }
                                    }
                                    variant={'outlined'}>
                                    Тиждень
                                </Button>
                            </Stack>
                            <Stack spacing={1} direction="row">
                                <DateTime sx={{ width : '40%' }} name="from" control={control} label="Від" />
                                <DateTime sx={{ width : '40%' }} name="to" control={control} label="До" />

                                <Button sx={{ width : '20%' }} onClick={handleSubmit(onSubmit)} variant={'outlined'}>
                                    Виконати
                                </Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card> :
                    null
            }

            {
                data?.data?.length ?
                    <BaseTable
                        tableHead={['Дата', 'Час', 'Значення', 'Дії']}
                        tableData={data?.data}
                        Item={TableItem}
                        handleChangePage={(_, page) => handleQueryChange({ page })}
                        handleChangeRowsPerPage={(event) => handleQueryChange({ offset : +event.target.value })}
                        page={query.page}
                        rowsPerPage={query.offset}
                        totalCount={data?.totalCount ?? 0}
                        handleItemDeletion={handleDelete}
                    /> :
                    <Typography variant="h5" component="div">
                        Немає показань
                    </Typography>
            }

            <Fab color="primary" aria-label="add" onClick={_ => setCreateMeterModal(true)} sx={{
                position : 'absolute',
                bottom   : 16,
                right    : 16,
            }}>
                <AddIcon />
            </Fab>

            <YesNoModal
                open={yesNoOpen}
                handleClose={_ => setYesNoOpen(false)}
                itemToDeleteName={'показання'}
                handleAccept={_ => deleteReading(readingToDeleteId.current).then(_ => setYesNoOpen(false))}
            />

            <Dialog fullWidth={true} maxWidth={'xs'} open={!!createMeterModal} onClose={_ => setCreateMeterModal(false)}>
                <DialogTitle>Редагування лічильника</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ paddingTop : '5px' }}>
                        <Text name="date" control={control} variant="outlined" placeholder="Дата" label={'Дата'} />

                        <Text name="value" control={control} variant="outlined" placeholder="Значення" label={'Значення'} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={_ => setCreateMeterModal(false)}>Скасувати</Button>
                    <Button onClick={handleClose}>Підтвердити</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Readings;

