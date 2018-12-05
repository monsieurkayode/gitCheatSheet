import React, { Fragment } from 'react';
import Container from '../Common/Container';
import Button from '../Common/Button';
import FormField from '../Common/FormField';

const LoginPage = () => (
  <Fragment>
    <Container>
      <form>
        <FormField
          icon="account_circle"
          placeholder="Username"
          name="username"
          value=""
          error="Enter your username"
        />
        <FormField
          icon="lock_open"
          type="password"
          placeholder="Password"
          name="password"
          value=""
          error="Enter password to authenticate"
        />
        <div className="form-field">
          <Button type="button" value="Login" />
        </div>
      </form>
    </Container>
  </Fragment>
);

export default LoginPage;
