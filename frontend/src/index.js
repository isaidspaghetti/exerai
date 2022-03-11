import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter, as Router, Switch } from 'react-router-dom';

const routing = (
  <Router>
    <React.StrictMode>
      <SideBar />
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </React.StrictMode>
  </Router>
)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
