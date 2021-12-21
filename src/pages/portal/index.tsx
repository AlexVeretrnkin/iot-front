import { Button, Stack, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import 'chart.js/auto';
import { Bar, Chart, Line } from 'react-chartjs-2';
import moment from 'moment';
import { CardGiftcardRounded } from '@mui/icons-material';
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { DateTime } from '../../components/form/DateTime';


function getFromTo(type: string) {
    const currentDate = moment() //new Date();
    let otherDate = moment(currentDate)

    if (type == "hour") {
        otherDate.subtract(1, 'hours')
        return [otherDate, currentDate]
    } else if (type == "day") {
        otherDate.subtract(1, 'days')
        return [otherDate, currentDate]
    } else if (type == "week") {
        otherDate.subtract(7, 'days')
        return [otherDate, currentDate]
    }
}

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
   const onSubmit = (data) => console.log(data);

    return <Stack spacing={3}>
        <Masonry columns={{xs: 1, sm: 1, md: 2, lg:2, xl:3}} spacing={1}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Кількість лічильників
                    </Typography>

                    <Typography variant="h4" component="div">
                        13
                    </Typography>
                </CardContent>
            </Card>
        </Masonry>
        
    
        <Masonry columns={{xs: 1, sm: 1, md: 2, lg:2, xl:3}} spacing={1}>
            <Card variant="outlined">
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div">
                                Огляд інформації
                        </Typography>
                        <Stack spacing={1} direction="row">
                            <Button 
                                sx={{ width: '1/3' }} 
                                onClick={() => {let [from, to] = getFromTo('hour'); setValue('dateFrom', from); setValue('dateTo', to)}} 
                                variant={"outlined"}>
                                Година
                            </Button>
                            <Button 
                            sx={{ width: '1/3' }} 
                            onClick={() => {let [from, to] = getFromTo('day'); setValue('dateFrom', from); setValue('dateTo', to)}} 
                            variant={"outlined"}>
                                День
                            </Button>
                            <Button 
                            sx={{ width: '1/3' }} 
                            onClick={() => {let [from, to] = getFromTo('week'); setValue('dateFrom', from); setValue('dateTo', to)}} 
                            variant={"outlined"}>
                                Тиждень
                            </Button>
                        </Stack>
                        <Stack spacing={1} direction="row">
                            <DateTime sx={{ width: '40%' }} name="dateFrom" control={control} label="Від"/>
                            <DateTime sx={{ width: '40%' }} name="dateTo" control={control} label="До"/>
                            
                            <Button sx={{ width: '20%' }} onClick={handleSubmit(onSubmit)} variant={"outlined"}>
                                Виконати
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Показників отримано 
                    </Typography>
                    <Bar data={chartData} />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Вжиток електроенергії 
                    </Typography>
                    <Line data={chartData} />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Вжиток газу 
                    </Typography>
                    <Line data={chartData} />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Вжиток теплоенергії 
                    </Typography>
                    <Line data={chartData} />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Вжиток води 
                    </Typography>
                    <Line data={chartData} />
                </CardContent>
            </Card>
    </Masonry>
  </Stack>
    
    /*<Grid container spacing={2} justifyContent={'center'}>
        <Grid item sx={{ width : '50%' }}>
            <Card >
                <CardContent>
                    <Typography variant="h5" component="div">
                        Кількість лічильників
                    </Typography>
                    
                </CardContent>
            </Card>
        </Grid>

        <Grid item sx={{ width : '50%' }}>
            <Card >
                <CardContent>
                    <Typography variant="h5" component="div">
                        Отримано даних
                    </Typography>
                    
                    <Line sx={{ width : '100%' }} data={chartData} />
                </CardContent>
            </Card>
        </Grid>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Вжиток води
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Вжиток води
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Вжиток електронергії
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Вжиток газу
                </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>

        <Card sx={{ width : 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Вжиток теплоенергії
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
