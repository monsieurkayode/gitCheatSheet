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
          error="Username is required"
        />
        <FormField
          icon="lock"
          type="password"
          placeholder="Password"
          name="password"
          value=""
          error="Password is required"
        />
        <FormField
          icon="lock"
          type="password"
          placeholder="Confirm Password"
          name="password"
          value=""
          error="Passwords do not match"
        />
        <div className="form-field">
          <Button type="button" value="Register" />
        </div>
      </form>
    </Container>
  </Fragment>
);

export default LoginPage;
