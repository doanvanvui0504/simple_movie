import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/:category', component: Catalog },
    { path: '/:category/:id', component: Detail },
    { path: '/:category/search/:keyword', component: Catalog },
];
