import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/userActions';
import Container from '../Common/Container';
import Button from '../Common/Button';
import FormField from '../Common/FormField';
import Loader from '../Common/Loader';

class LoginPage extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  }

  static initialState = () => ({
    user: {
      username: '',
      password: ''
    },
    errors: {}
  })

  state = { ...LoginPage.initialState() }

  handleInputChange = (event) => {
    const { user, errors } = this.state;
    user[event.target.name] = event.target.value;
    errors[event.target.name] = '';
    this.setState({ user, errors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validateUser(this.state.user);

    if (Object.keys(errors).length) {
      return this.setState({ errors });
    }

    this.props.loginUser(this.state.user);
  }

  handleBlur = (event) => {
    const { errors } = this.state;
    errors[event.target.name] = this.validateUser(
      this.state.user
    )[event.target.name];
    this.setState({ errors });
  }

  validateUser = ({ username, password }) => {
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Enter your username';
    }

    if (!password) {
      errors.password = 'Enter your password to login';
    }

    return errors;
  }

  render() {
    const { user, errors } = this.state;
    const { authenticated, loading } = this.props;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Container>
          <form onSubmit={this.handleSubmit}>
            <FormField
              icon="account_circle"
              placeholder="Username"
              name="username"
              value={user.username}
              error={errors.username}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              loading={loading}
            />
            <FormField
              icon="lock_open"
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              error={errors.password}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              loading={loading}
            />
            <div className="form-field">
              <Button type="submit" value="Login" disabled={loading} />
              <Loader size={15} strokeColor="#fff" inline loading={loading} />
            </div>
          </form>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userDetails }) => ({
  authenticated: Object.keys(userDetails.user).length === 2,
  loading: userDetails.makingApiRequest
});

export default connect(mapStateToProps, { loginUser })(LoginPage);
