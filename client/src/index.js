import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import Navbar from './components/Common/Navbar';
import CheatPage from './components/Cheat/CheatPage';

import './assets/styles/index.scss';

render(
  <BrowserRouter>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={SignupPage} />
      <Route exact path="/cheats/:category" component={CheatPage} />
    </Fragment>
  </BrowserRouter>,
  document.getElementById('root')
);
