import { RouteModel } from '../models/route.model';
import IndexPage from '../pages';
import Portal from '../hoc/layout/Portal';

export const routesConfig: RouteModel[] = [
    {
        route: '/',
        component: IndexPage,
        name: 'index'
    },

    {
        route: '/portal',
        component: Portal,
        name: 'Огляд'
    },
    {
        route: '/portal/meters',
        component: Portal,
        name: 'Лічильники'
    }
];
