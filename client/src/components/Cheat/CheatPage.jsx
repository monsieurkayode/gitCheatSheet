/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheatCard from './CheatCard';
import NoContent from '../Common/NoContent';
import Loader from '../Common/Loader';

const Container = styled.main`
  max-width: 1232px;
  margin: 60px 0;
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
  column-count: auto;
  column-width: 360px;
  margin-top: 20px;
`;

export const CheatPage = ({
  match,
  cheats,
  loading,
  searchTerm
}) => {
  const filteredCheats = cheats
    .filter((cheat) => {
      const keyword = searchTerm.toLowerCase();
      return (
        cheat.keywords.includes(keyword)
        || cheat.header.toLowerCase().includes(keyword)
        || cheat.description.toLowerCase().includes(keyword)
      );
    });

  return (
    <Fragment>
      {cheats.length === 0 && (
        <Loader
          style={{ display: loading ? '' : 'none' }}
          size={40}
          strokeColor="#6756b3"
          loading={loading}
        />
      )}
      {cheats.length === 0 && !loading && (
      <NoContent
        content="Oops, sorry can't find what you're looking for"
      />)}
      {cheats.length > 0 && filteredCheats.length === 0 && !loading && (
      <NoContent
        content="No cheat found, try with a diffrent keyword"
      />)}
      {filteredCheats.length > 0 && (
      <Container>
        <HeaderWrapper>
          <Heading>{match.params.category.replace(/-/g, ' ')}&nbsp;</Heading>
          <Heading sub>cheatsheet</Heading>
        </HeaderWrapper>
        <Section>
          {filteredCheats
            .map(cheat => <CheatCard key={cheat._id} {...cheat} />)}
        </Section>
      </Container>
      )}
    </Fragment>
  );
};

CheatPage.defaultProps = {
  searchTerm: ''
};

CheatPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  cheats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string
};

const mapStateToProps = ({ cheatSheets }, { match }) => {
  let { category } = match.params;
  category = category.replace(/-/g, ' ');
  const cheats = cheatSheets.cheats
    .filter(cheat => cheat.category.name === category);
  return {
    cheats,
    searchTerm: cheatSheets.searchTerm.trim(),
    loading: cheatSheets.makingApiRequest
  };
};

export default connect(mapStateToProps)(CheatPage);
