import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '../components/Common/Container';
import SearchBar from '../components/Common/SearchBar';

export default ((ComposeComponent) => {
  const Authenticate = (props) => {
    if (!props.authenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <Container style={{ marginBottom: 0, flex: 0 }}>
          <SearchBar />
        </Container>
        <ComposeComponent {...props} />
      </Fragment>
    );
  };

  const mapStateToProps = ({ userDetails }) => ({
    authenticated: Object.keys(userDetails.user).length === 2
  });

  return connect(mapStateToProps)(Authenticate);
});
