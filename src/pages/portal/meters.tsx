import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import BaseTable from '../../components/Table';
import { FC, useRef, useState } from 'react';
import { MeterQueryModel } from '../../models/query/meter-query.model';
import { useCreateMeterMutation, useGetMetersQuery, useRemoveMeterMutation, useUpdateMeterMutation } from '../../store/meters.api';
import { MeterModel } from '../../models/meter.model';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab,
    IconButton,
    Link,
    Stack,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Text } from '../../components/form/Text';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import YesNoModal from '../../components/modals/yes-no-modal';
import { MeterEnum } from '../../enums/meter.enum';
import BaseSelect from '../../components/form/base-select';


import OpacityIcon from '@mui/icons-material/Opacity'; // Water
import BoltIcon from '@mui/icons-material/Bolt'; // Electricity
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'; // Gas
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto'; // Heat

const typeToLabel = {
    "electricity": "Електроенергія",
    "water": "Вода",
    "heating": "Тепло",
    "gas": "Газ",
}

const TableItem: FC<{
    data: MeterModel,
    handleItemDeletion: (id: string) => void;
    handleItemUpdate: (item: MeterModel) => void
}> = ({ data, handleItemDeletion, handleItemUpdate }) => <TableRow
    key={data.id}
    sx={{ '&:last-child td, &:last-child th' : { border : 0 } }}
>
    <TableCell component="th" scope="row">
        {data.name}
    </TableCell>
    <TableCell align="right">
        <Stack direction="row" justifyContent="flex-begin" spacing={4}>
            
            {data.type == "water" ? <OpacityIcon/> 
            : data.type == "electricity" ? <BoltIcon/>
            : data.type == "heating" ? <ThermostatAutoIcon/>
            : data.type == "gas" ? <LocalGasStationIcon/>
            : <OpacityIcon/>}
            
            {typeToLabel[data.type]}
        </Stack>
    </TableCell>
    <TableCell align="right">{data.serial}</TableCell>
    <TableCell align="right">
        <Link href={"https://www.google.com/maps/search/" + data.position.replace(' ', '+')}>
            {data.position}
        </Link>
    </TableCell>
    <TableCell align="right">
        <IconButton aria-label="edit" onClick={_ => navigator.clipboard.writeText(data.key)}>
            <ContentCopyIcon />
        </IconButton>
    </TableCell>
    <TableCell align="right" width={50}>
        <Stack direction="row" justifyContent="flex-end" spacing={0}>
            <IconButton aria-label="edit" onClick={_ => handleItemUpdate(data)}>
                <EditIcon />
            </IconButton>

            <IconButton aria-label="delete" onClick={_ => handleItemDeletion(data.id)}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    </TableCell>
</TableRow>;

function Meters () {
    const [query, setQuery] = useState<MeterQueryModel>({ page : 0, offset : 5 });

    const [meterToUpdate, setMeterToUpdate] = useState(null);

    const [yesNoOpen, setYesNoOpen] = useState(false);

    const { handleSubmit, reset, control, setValue, getValues } = useForm();

    const { data, error, isLoading } = useGetMetersQuery(query);
    const [deleteMeter, { isLoading : isDeleting }] = useRemoveMeterMutation();
    const [updateMeter, { isLoading : isUpdating }] = useUpdateMeterMutation();
    const [createMeter, { isLoading : isCreating }] = useCreateMeterMutation();

    const meterToDeleteId = useRef(null);

    const openUpdateModal = (meter?: MeterModel) => {
        setValue('name', meter?.name);
        setValue('type', meter?.type);
        setValue('serial', meter?.serial);
        setValue('position', meter?.position);

        setMeterToUpdate(meter ?? {});
    };

    const handleClose = () => {
        const meter: MeterModel = getValues() as MeterModel;

        if (meterToUpdate?.id) updateMeter({
            ...meterToUpdate,
            ...meter,
        });

        if (!!meterToUpdate && !meterToUpdate?.id && Object.keys(meter).length === 4) createMeter(meter);

        setMeterToUpdate(null);
    };

    const handleDelete = (id) => {
        meterToDeleteId.current = id;

        setYesNoOpen(true);
    }

    const handleQueryChange = (newQuery: Partial<MeterQueryModel>) => {
        setQuery({
            ...query,
            ...newQuery,
        });
    };

    return (
        <Container>
            <BaseTable
                tableHead={['Назва', 'Тип', 'Серійний номер', 'Розташування', 'Ключ', 'Дії']}
                tableData={data?.data}
                Item={TableItem}
                handleChangePage={(_, page) => handleQueryChange({ page })}
                handleChangeRowsPerPage={(event) => handleQueryChange({ offset : +event.target.value })}
                page={query.page}
                rowsPerPage={query.offset}
                totalCount={data?.totalCount ?? 0}
                handleItemDeletion={handleDelete}
                handleItemUpdate={openUpdateModal}
            />

            <Fab color="primary" aria-label="add" onClick={_ => openUpdateModal()} sx={{
                position : 'absolute',
                bottom   : 16,
                right    : 16,
            }}>
                <AddIcon />
            </Fab>

            <YesNoModal
                open={yesNoOpen}
                handleClose={_ => setYesNoOpen(false)}
                itemToDeleteName={'лічильник'}
                handleAccept={_ => deleteMeter(meterToDeleteId.current).then(_ => setYesNoOpen(false))}
            />

            <Dialog fullWidth={true} maxWidth={'xs'} open={!!meterToUpdate} onClose={_ => setMeterToUpdate(null)}>
                <DialogTitle>Редагування лічильника</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ paddingTop : '5px' }}>
                        <Text name="name" control={control} variant="outlined" placeholder="Назва" label={'Назва'} />
                        <BaseSelect name="type" control={control} variant="outlined" placeholder="Тип" label={'Тип'} values={MeterEnum} />
                        <Text name="serial" control={control} variant="outlined" placeholder="Серійний номер" label={'Серійний номер'} />
                        <Text name="position" control={control} variant="outlined" placeholder="Розташування" label={'Розташування'} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={_ => setMeterToUpdate(null)}>Скасувати</Button>
                    <Button onClick={handleClose}>Підтвердити</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Meters;

