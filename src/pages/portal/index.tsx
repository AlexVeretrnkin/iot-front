import { Button, Stack, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import 'chart.js/auto';
import { Bar, Chart, Line } from 'react-chartjs-2';
import moment from 'moment';
import { CardGiftcardRounded } from '@mui/icons-material';
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { DateTime } from '../../components/form/DateTime';
import { useGetConsumptionQuery, useGetMeterCountQuery, useGetReceivedReadingsQuery } from '../../store/stats.api';
import { DateRangeQueryModel } from '../../models/query/date-range-query.model';

import { getFromTo } from '../../core/date-formater';


let [fromDateValue, toDateValue] = getFromTo('day')
let defaultValues = {
    dateFrom: fromDateValue,
    dateTo: toDateValue
};



const chartData = {
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
    {
        id: 1,
        label: '',
        data: [5, 6, 7],
    },
    {
        id: 2,
        label: '',
        data: [3, 2, 1],
    },
    ],
}



export default function Main () {
   const { handleSubmit, reset, control, setValue } = useForm({ defaultValues: defaultValues });
   const onSubmit = (data) => {
       console.log(data)
       setDateQuery({from: data.dateFrom, to: data.dateTo})
   }

   const [dateQuery, setDateQuery] = useState<DateRangeQueryModel>({ from: moment(defaultValues.dateFrom), to: moment(defaultValues.dateTo) });
   const { data: meterCountData, error: meterCountError, isLoading: meterCountIsLoading } = useGetMeterCountQuery();
   const { data: receivedReadingsData, error: receivedReadingsError, isLoading: receivedReadingsIsLoading } = useGetReceivedReadingsQuery(dateQuery);
   const {data: eleConData, error: eleConError, isLoading: eleConIsLoading } = useGetConsumptionQuery({...dateQuery, type: "electricity"})
   const {data: waterConData, error: waterConError, isLoading: waterConIsLoading } = useGetConsumptionQuery({...dateQuery, type: "water"})
   const {data: heatConData, error: heatConError, isLoading: heatConIsLoading } = useGetConsumptionQuery({...dateQuery, type: "heat"})
   const {data: gasConData, error: gasConError, isLoading: gasConIsLoading } = useGetConsumptionQuery({...dateQuery, type: "gas"})

    return <Stack spacing={3}>
        <Masonry columns={{xs: 1, sm: 1, md: 2, lg:2, xl:3}} spacing={1}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        ?????????????????? ??????????????????????
                    </Typography>

                    <Typography variant="h4" component="div">
                        {meterCountIsLoading ? '...' : meterCountData}
                    </Typography>
                </CardContent>
            </Card>
        </Masonry>


        <Masonry columns={{xs: 1, sm: 1, md: 2, lg:2, xl:3}} spacing={1}>
            <Card variant="outlined">
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div">
                                ?????????? ????????????????????
                        </Typography>
                        <Stack spacing={1} direction="row">
                            <Button
                                sx={{ width: '1/3' }}
                                onClick={() => {let [from, to] = getFromTo('hour'); setValue('dateFrom', from); setValue('dateTo', to)}}
                                variant={"outlined"}>
                                ????????????
                            </Button>
                            <Button
                            sx={{ width: '1/3' }}
                            onClick={() => {let [from, to] = getFromTo('day'); setValue('dateFrom', from); setValue('dateTo', to)}}
                            variant={"outlined"}>
                                ????????
                            </Button>
                            <Button
                            sx={{ width: '1/3' }}
                            onClick={() => {let [from, to] = getFromTo('week'); setValue('dateFrom', from); setValue('dateTo', to)}}
                            variant={"outlined"}>
                                ??????????????
                            </Button>
                        </Stack>
                        <Stack spacing={1} direction="row">
                            <DateTime sx={{ width: '40%' }} name="dateFrom" control={control} label="??????"/>
                            <DateTime sx={{ width: '40%' }} name="dateTo" control={control} label="????"/>

                            <Button sx={{ width: '20%' }} onClick={handleSubmit(onSubmit)} variant={"outlined"}>
                                ????????????????
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        ???????????????????? ????????????????
                    </Typography>
                    <Bar data={receivedReadingsIsLoading ? chartData: {labels: receivedReadingsData.map(r => r.at), datasets: [{label: '??????????????????', data: receivedReadingsData.map(r => r.count)}]}} />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        ???????????? ????????????????????????????
                    </Typography>
                    <Line data={eleConIsLoading ? chartData : {labels: eleConData.map(r => r.at), datasets: [{label: '????????????', data: eleConData.map(r => r.consumption)}]}} />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        ???????????? ????????
                    </Typography>
                    <Line data={waterConIsLoading ? chartData : {labels: waterConData.map(r => r.at), datasets: [{label: '????????????', data: waterConData.map(r => r.consumption)}]}} />

                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        ???????????? ????????
                    </Typography>
                    <Line data={gasConIsLoading ? chartData : {labels: gasConData.map(r => r.at), datasets: [{label: '????????????', data: gasConData.map(r => r.consumption)}]}} />

                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        ???????????? ????????????????????????
                    </Typography>
                    <Line data={heatConIsLoading ? chartData : {labels: heatConData.map(r => r.at), datasets: [{label: '????????????', data: heatConData.map(r => r.consumption)}]}} />

                </CardContent>
            </Card>

          
    </Masonry>
  </Stack>

    /*<Grid container spacing={2} justifyContent={'center'}>
        <Grid item sx={{ width : '50%' }}>
            <Card >
                <CardContent>
                    <Typography variant="h5" component="div">
                        ?????????????????? ??????????????????????
                    </Typography>

                </CardContent>
            </Card>
        </Grid>

        <Grid item sx={{ width : '50%' }}>
            <Card >
                <CardContent>
                    <Typography variant="h5" component="div">
                        ???????????????? ??????????
                    </Typography>

                    <Line sx={{ width : '100%' }} data={chartData} />
                </CardContent>
            </Card>
        </Grid>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    ???????????? ????????
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    ???????????? ????????
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    ???????????? ??????????????????????????
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    ???????????? ????????
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    ???????????? ????????????????????????
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        {Array(6).fill(1).map((_, idx) =>
            <Grid item key={idx}>

                <Card sx={{ width : 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize : 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            benevolent
                        </Typography>
                        <Typography sx={{ mb : 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>,
        )}
    </Grid>;*/
}
