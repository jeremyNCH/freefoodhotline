import React, { Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './components/history';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';

import AuthState from './context/auth/AuthState';
import FoodState from './context/food/FoodState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <FoodState>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <Switch>
            <div className="container">
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </div>
          </Switch>
          <Footer />
        </Fragment>
      </Router>
      </FoodState>
    </AuthState>
  );
}

export default App;
