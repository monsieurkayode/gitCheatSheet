import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  text-align: center;
  max-width: 1232px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  flex: 1;
  width: 100%;
  transform: translateY(-64px);

  i {
    color: #4d75a1;
    font-size: 50px;
  }
  
  .no-content-info {
    color: #668090;
    font-family: Roboto, sans-serif;
    font-weight: 400;
  }
`;

const NoContent = ({ content }) => (
  <Container className="no-content">
    <i className="material-icons">info</i>
    <h3 className="no-content-info">
      {content}
    </h3>
  </Container>
);

NoContent.propTypes = {
  content: PropTypes.string.isRequired
};

export default NoContent;
