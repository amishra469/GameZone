import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Routing from './containers/Routing/Routing';
import Header from './containers/Header/Header';
import AppLayout from './containers/AppLayout/AppLayout';
import "./App.css"

const App = () => {
  return (
    <>
      <Header />
      <AppLayout>
        <RouterProvider router={Routing} />
      </AppLayout>
    </>
  )
}

export default App
