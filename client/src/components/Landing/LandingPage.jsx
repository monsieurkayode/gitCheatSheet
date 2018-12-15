/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../Common/Container';
import CategoryCard from '../Common/CategoryCard';
import SearchPage from './SearchDisplay';

const Section = styled.section`
  margin-top: 80px;
  display: flex;
  flex-flow: row wrap;

  @media only screen and (max-width: 424px) {
    margin-top: 40px;
  }
`;

export const LandingPage = ({ categories, searchTerm }) => (
  <Fragment>
    {searchTerm.length === 0 && (
    <Container>
      <Section>
        { categories.map(category => (
          <CategoryCard
            className="category"
            key={category._id}
            category={category.name}
          />
        ))}
      </Section>
    </Container>)}
    <SearchPage />
  </Fragment>
);

LandingPage.defaultProps = {
  searchTerm: ''
};

LandingPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchTerm: PropTypes.string
};

export const mapStateToProps = ({ cheatSheets }) => ({
  categories: cheatSheets.categories,
  searchTerm: cheatSheets.searchTerm.trim()
});

export default connect(mapStateToProps)(LandingPage);
