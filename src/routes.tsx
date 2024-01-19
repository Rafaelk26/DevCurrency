import { createBrowserRouter } from 'react-router-dom';

import { Home } from './pages/home';
import { Detail } from './pages/detail';
import { NotFound } from './pages/notFound';

import { Layout } from './components/layout';
const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path: '/',
                element: <Home/>
            },
            {
                path:'/detail/:id',
                element: <Detail/>
            },
            {
                path:'*',
                element: <NotFound/>
            }
        ]
    }
])

export { router };