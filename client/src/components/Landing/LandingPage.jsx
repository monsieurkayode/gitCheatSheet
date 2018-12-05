import React, { Fragment } from 'react';
import styled from 'styled-components';
import Container from '../Common/Container';
import SearchBar from '../Common/SearchBar';
import CategoryCard from '../Common/CategoryCard';
import Footer from '../Common/Footer';
import categories from '../../../../global/categories';

const Section = styled.section`
  margin-top: 80px;
  display: flex;
  flex-flow: row wrap;

  @media only screen and (max-width: 424px) {
    margin-top: 40px;
  }
`;

const LandingPage = () => (
  <Fragment>
    <Container>
      <SearchBar />
      <Section>
        { categories.map(category => (
          <CategoryCard
            className="category"
            key={category}
            category={category}
          />
        ))}
      </Section>
    </Container>
    <Footer />
  </Fragment>
);

export default LandingPage;
