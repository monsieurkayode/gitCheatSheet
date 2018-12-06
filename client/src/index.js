import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import decode from 'jwt-decode';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import Navbar from './components/Common/Navbar';
import CheatPage from './components/Cheat/CheatPage';
import store from './store';
import { loginUserSuccess } from './actions/userActions';

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/index.scss';

if (localStorage.getItem('jwtToken')) {
  const { user } = decode(localStorage.getItem('jwtToken'));
  store.dispatch(loginUserSuccess(user));
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <ToastContainer />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={SignupPage} />
        <Route exact path="/cheats/:category" component={CheatPage} />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
