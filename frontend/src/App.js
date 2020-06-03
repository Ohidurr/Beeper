import React, { createContext } from 'react';
import logo from './logo.svg';
import './App.css';
export const Context = createContext()
import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Switch>
      <h1>Beeper</h1>
        <p>Be heard</p>

    </div>
  );
}

export default App;
