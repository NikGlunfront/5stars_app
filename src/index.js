import React, { createRef } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const routes = [
    { path: '/', name: 'Home', element: <Home />, nodeRef: createRef()}
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: routes.map((route) => ({
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.element,
        })),
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
