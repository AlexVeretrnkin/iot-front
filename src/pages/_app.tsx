import '../styles/globals.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import store from '../store/store';
import axios, { AxiosError } from 'axios';
import { removeToken } from '../core/auth';
import getLayout from '../core/Layout';
import { ReactElement } from 'react';

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

    return (
        <Provider store={store}>
            {Layout}
        </Provider>
    );
}
