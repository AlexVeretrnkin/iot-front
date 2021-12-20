import { Button, Input, Snackbar, Stack } from '@mui/material';
import { MutableRefObject, useRef, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { login } from '../core/auth';
import { useRouter } from 'next/router';

function Auth () {
    const username: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>();
    const pass: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>();

    const [snackbarMessage, setSnackbarMessage] = useState(null);

    const router = useRouter();

    const authAction = (route: string, onfulfilled: (resp: AxiosResponse) => void) => {
        const name = (username.current.firstElementChild as HTMLInputElement).value;
        const password = (pass.current.firstElementChild as HTMLInputElement).value;

        axios.post(route, {
            username : name,
            password,
        }).then(
            onfulfilled,
            (err: AxiosError) => {
                setSnackbarMessage(err.response?.data?.message || err?.response?.data?.error);
            },
        );
    };

    const loginUser = (): void => {
        authAction('auth/login', (resp: AxiosResponse) => {
            login(resp.data.accessToken);

            router.push('/portal');
        });
    };

    const register = (): void => {
        authAction('auth/register', (resp: AxiosResponse) => {
            setSnackbarMessage('User registered!');
        });
    };

    return (
        <Stack spacing={2}>
            <Input ref={username} placeholder="Username" />

            <Input ref={pass} placeholder="Password" />

            <Button prefix="primary" variant="contained" onClick={loginUser}>Login</Button>

            <Button prefix="primary" variant="contained" onClick={register}>Register</Button>

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
    );
}

export default Auth;
