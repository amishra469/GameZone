import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import ErrorPage from '../AppLayout/ErrorPage';
import TicKTakToe from "../TickTackToe/TickTakToe"
import MemoryMatching from '../MemoryMatching/MemoryMatching';

const Routing = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        errorElement: <ErrorPage />
    },
    {
        path: "/tiktaktoe",
        element: <TicKTakToe />,
        errorElement: <ErrorPage />
    },
    {
        path: "/memorymatching",
        element: <MemoryMatching />,
        errorElement: <ErrorPage />
    }

])

export default Routing
