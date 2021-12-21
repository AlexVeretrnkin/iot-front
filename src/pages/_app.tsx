import '../styles/globals.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import store from '../store/store';
import axios, { AxiosError } from 'axios';
import { removeToken } from '../core/auth';
import getLayout from '../core/Layout';
import { ReactElement } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { CssBaseline, useMediaQuery } from '@mui/material';
import dark from '../themes/dark';
import white from '../themes/white';
import { ThemeOptions } from '@mui/material/styles/createTheme';

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {

        if (error.response.status === 401) {

            removeToken();

            if (window.location.pathname !== '/') {
                window.location.pathname = '/';
            }
        }

        return Promise.reject(error);
    },
);



export default function MyApp ({ Component, pageProps }: AppProps) {
    const Layout: ReactElement = getLayout(Component, pageProps);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={prefersDarkMode ? createTheme(dark as unknown as ThemeOptions) : createTheme(white as unknown as ThemeOptions)}>
            <CssBaseline />
            <Provider store={store}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    {Layout}
                </LocalizationProvider>
            </Provider>
        </ThemeProvider>
    );
}
