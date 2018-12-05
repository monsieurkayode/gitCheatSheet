import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheatCard from './CheatCard';

const Container = styled.main`
  max-width: 1232px;
  margin-top: 60px;
  padding: 0 1%;
  flex: 1;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Heading = styled.h2`
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 300;
  font-size: 40px;
  text-transform: capitalize;
  text-align: center;
  color: ${({ sub }) => (sub ? '#668090' : '')};
  padding: 4px 0;

  @media only screen and (max-width: 768px) {
    font-size: 34px;
  }
`;

const Section = styled.section`
  column-count: 3;
  column-gap: 0;
  margin-top: 20px;

  @media only screen and (max-width: 960px) {
    column-count: 2;
  }

  @media only screen and (max-width: 640px) {
    column-count: 1;
  }
`;

const CheatPage = ({ match }) => (
  <Fragment>
    <Container>
      <HeaderWrapper>
        <Heading>{match.params.category.replace(/-/g, ' ')}&nbsp;</Heading>
        <Heading sub>cheatsheet</Heading>
      </HeaderWrapper>
      <Section>
        <CheatCard />
        <CheatCard />
        <CheatCard />
        <CheatCard />
        <CheatCard />
      </Section>
    </Container>
  </Fragment>
);

CheatPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default CheatPage;
