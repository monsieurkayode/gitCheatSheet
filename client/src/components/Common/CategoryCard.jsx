import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Container = styled.div`
  height: 64px;
  flex: 1 1 23%;
  min-width: 160px;
  background: #668090;
  border-radius: 4px;
  margin: 5px;
  padding: 0 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-transform: uppercase;
  font-family: Prompt, sans-serif;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  color: #fff;

  p {
    width: 100%;
  }

  .fiber {
    vertical-align: sub;
    font-size: 14px;
    color: #93d82a;
  }

  &:hover {
    background: #546975;
  }

  @media only screen and (max-width: 424px) {
    flex: 1 1 98%;
  }
`;

const CategoryCard = ({ category, history }) => (
  <Container
    onClick={() => history.push(`/cheats/${category.replace(/[ ]/g, '-')}`)}
    key={category}
    className="category"
  >
    <p>
      {category}&nbsp;&nbsp;
      <i className="material-icons fiber">fiber_manual_record</i>
    </p>
  </Container>
);

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(CategoryCard);
