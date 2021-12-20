import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import { routesConfig } from '../config/route.config';

export default function getLayout (Component, pageProps): ReactElement {
    const router: NextRouter = useRouter();

    const LayoutFn: Function = routesConfig.find(route => route?.route === router?.route)?.component;

    return LayoutFn === Component || !LayoutFn ?
        <Component {...pageProps} /> :
        <LayoutFn>
            <Component {...pageProps} />
        </LayoutFn>
}
