import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import decode from 'jwt-decode';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import Navbar from './components/Common/Navbar';
import CheatPage from './components/Cheat/CheatPage';
import NotFoundPage from './components/Common/NotFoundPage';
import Footer from './components/Common/Footer';
import Auth from './helpers/Authenticate';
import store from './store';
import { loginUserSuccess } from './actions/userActions';
import fetchCheats from './actions/cheatActions';

import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import './assets/styles/index.scss';

if (localStorage.getItem('jwtToken')) {
  const { user } = decode(localStorage.getItem('jwtToken'));
  store.dispatch(loginUserSuccess(user));
}

store.dispatch(fetchCheats());

render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Fragment>
          <Navbar />
          <ToastContainer />
        </Fragment>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage)} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={SignupPage} />
          <Route exact path="/cheats/:category" component={Auth(CheatPage)} />
          <NotFoundPage />
        </Switch>
        <Footer />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
