import React, { createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
export const Context = createContext()


function App() {
  return (
    <div className="App">
      <h1>Beeper</h1>
        <p>Be heard</p>
    <Switch>
    <Route path={"/feed"}>
    <feedPage/>
    </Route>
</Switch>
    </div>
  );
}

export default App;
