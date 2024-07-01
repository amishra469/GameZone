import React from 'react';
// import TicTakToe from './containers/TickTackToe/TickTakToe';
import Dashboard from './containers/Dashboard/Dashboard';
import Header from './containers/Header/Header';
import "./App.css"

const App = () => {
  return (
    <div className="h-screen bg-gray-500 flex flex-col justify-center">
      <Header />
      <Dashboard />
    </div>
  )
}

export default App
