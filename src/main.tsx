import './index.css'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "@store/Store.ts";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider>
                <Notifications />
                <App/>
            </MantineProvider>
        </Provider>
    </React.StrictMode>,
)
