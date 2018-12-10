/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../Common/Container';
import SearchBar from '../Common/SearchBar';
import CategoryCard from '../Common/CategoryCard';
import Footer from '../Common/Footer';

const Section = styled.section`
  margin-top: 80px;
  display: flex;
  flex-flow: row wrap;

  @media only screen and (max-width: 424px) {
    margin-top: 40px;
  }
`;

export const LandingPage = ({ categories, history }) => (
  <Fragment>
    <Container>
      <SearchBar
        onChange={() => {}}
        onFocus={() => history.push('/search')}
      />
      <Section>
        { categories.map(category => (
          <CategoryCard
            className="category"
            key={category._id}
            category={category.name}
          />
        ))}
      </Section>
    </Container>
    <Footer />
  </Fragment>
);

LandingPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export const mapStateToProps = ({ cheatSheets }) => ({
  categories: cheatSheets.categories
});

export default connect(mapStateToProps)(LandingPage);
