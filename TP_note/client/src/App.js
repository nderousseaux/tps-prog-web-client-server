import React from 'react';
import {
  HashRouter,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Participant from './components/participant.js';
import Taches from "./components/taches";
import Actions from "./components/actions";

function App() {
  return(
      <HashRouter>
        <nav>
          <ul>
            <li>
              <Link to="/participants">Participants</Link>
            </li>
              <li>
                  <Link to="/taches">Taches</Link>
              </li>
              <li>
                  <Link to="/actions">Actions</Link>
              </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/participants">
            <Participant />
          </Route>
            <Route path="/taches">
                <Taches />
            </Route>
            <Route path="/actions">
                <Actions />
            </Route>
          <Redirect to="/" />
        </Switch>
      </HashRouter>
  )
}

export default App;