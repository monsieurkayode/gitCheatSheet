import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/userActions';
import Container from '../Common/Container';
import Button from '../Common/Button';
import FormField from '../Common/FormField';
import Loader from '../Common/Loader';
import { validateUserForm } from '../../../../shared/validator';

class SignupPage extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  }

  static initialState = () => ({
    user: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    errors: {}
  })

  state = { ...SignupPage.initialState() }

  handleInputChange = (event) => {
    const { user, errors } = this.state;
    user[event.target.name] = event.target.value;
    errors[event.target.name] = '';
    this.setState({ user, errors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { errors, isValid } = validateUserForm(this.state.user);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.props.registerUser(this.state.user);
  }

  handleBlur = (event) => {
    const { errors } = this.state;
    errors[event.target.name] = validateUserForm(
      this.state.user
    ).errors[event.target.name];
    this.setState({ errors });
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
              icon="lock"
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              error={errors.password}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              loading={loading}
            />
            <FormField
              icon="lock"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              error={errors.confirmPassword}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              loading={loading}
            />
            <div className="form-field">
              <Button type="submit" value="Register" disabled={loading} />
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

export default connect(mapStateToProps, { registerUser })(SignupPage);
