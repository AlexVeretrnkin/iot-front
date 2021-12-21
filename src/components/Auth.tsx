import { Button, Card, CardContent, Input, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { MutableRefObject, useRef, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { login } from '../core/auth';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { Text } from './form/Text';

function Auth () {
    const username: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>();
    const pass: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>();

    const [snackbarMessage, setSnackbarMessage] = useState(null);

    const router = useRouter();

    const authAction = (route: string, credentials={password:null, username:null}, onfulfilled: (resp: AxiosResponse) => void) => {
        const username = credentials.username
        const password = credentials.password

        axios.post(route, {
            username,
            password,
        }).then(
            onfulfilled,
            (err: AxiosError) => {
                setSnackbarMessage(err.response?.data?.message || err?.response?.data?.error);
            },
        );
    };

    const loginUser = (info): void => {
        authAction('auth/login', info, (resp: AxiosResponse) => {
            login(resp.data.accessToken);
            router.push('/portal');
        });
    };

    const register = (info): void => {
        authAction('auth/register', info, (resp: AxiosResponse) => {
            setSnackbarMessage('User registered!');
        });
    };

    const { handleSubmit, reset, control, setValue } = useForm();

    return (
        <Card variant="outlined">
            <CardContent >
                <Box m={2}>
                    <Stack spacing={4}>
                        <Typography variant="h5" component="div">
                            Авторизація
                        </Typography>

                        <Stack spacing={2}>

                            <Stack spacing={1}>
                                <Text name="username" control={control} variant="outlined"  placeholder="Ідентифікатор" />

                                <Text name="password" control={control} variant="outlined"  placeholder="Пароль" />
                            </Stack>

                            <Stack spacing={1}>
                                <Button prefix="primary" variant="contained" onClick={handleSubmit(loginUser)}>Увійти</Button>

                                <Button prefix="primary" variant="contained" onClick={handleSubmit(register)}>Заєреструватися</Button>
                            </Stack>

                            
                            <Snackbar
                                anchorOrigin={
                                    {
                                        vertical   : 'bottom',
                                        horizontal : 'center',
                                    }
                                }
                                open={!!snackbarMessage}
                                message={snackbarMessage}
                                autoHideDuration={2000}
                                onClose={() => setSnackbarMessage(null)}
                            />
                        </Stack>
                    </Stack>
                    
                </Box>
            </CardContent>
        </Card>
        
    );
}

export default Auth;
