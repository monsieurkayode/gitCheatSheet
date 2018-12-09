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

const LandingPage = ({ categories }) => (
  <Fragment>
    <Container>
      <SearchBar />
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
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = ({ cheatSheets }) => ({
  categories: cheatSheets.categories
});

export default connect(mapStateToProps)(LandingPage);
