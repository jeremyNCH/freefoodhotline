import React, { Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import PrivateRoute from './components/routing/PrivateRoute';
import TemporaryNav from './components/TemporaryNav';
import Home from './components/pages/Home';
import About from './components/pages/About';

import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
            <h1> FreeFood - Dash </h1>
            <TemporaryNav />
          <Switch>
            <div className="container">
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </div>
          </Switch>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
