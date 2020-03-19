import React from 'react';
import {
  HashRouter,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Toggle from './components/toggle.js';
import Counter from './components/counter.js';
import Clock from './components/clock.js';
import Grocery from './components/grocery.js';

function App() {
  return(
    <HashRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/toggle">Toggle</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/clock">Clock</Link>
            </li>
            <li>
              <Link to="/grocery">Grocery</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/toggle">
            <Toggle />
          </Route>
          <Route path="/counter">
            <Counter />
          </Route>        
          <Route path="/clock">
            <Clock />
          </Route>
          <Route path="/grocery">
            <Grocery />
          </Route>
          <Redirect to="/" />
        </Switch>
    </HashRouter>
  )
}

export default App;
