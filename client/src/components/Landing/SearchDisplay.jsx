/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheatCard from '../Cheat/CheatCard';
import NoContent from '../Common/NoContent';

const Section = styled.section`
  column-count: auto;
  column-width: 360px;
  max-width: 1232px;
  margin: 60px 0;
  flex: 1;
  width: 100%;
`;

const NotFound = styled(NoContent)`
  flex: 1
`;

export const SearchDisplay = ({
  cheats,
  loading,
  searchTerm
}) => {
  const filteredCheats = cheats
    .filter((cheat) => {
      const keyword = searchTerm.toLowerCase();
      return (
        cheat.category.name.toLowerCase().includes(keyword)
        || cheat.keywords.includes(keyword)
        || cheat.header.toLowerCase().includes(keyword)
        || cheat.description.toLowerCase().includes(keyword)
      );
    });

  return (
    <Fragment>
      {!loading
        && filteredCheats.length === 0
        && <NotFound content="No cheat found, try with a diffrent keyword" />}
      {filteredCheats.length > 0 && searchTerm.trim().length > 0 && (
      <Section>
        { filteredCheats
          .map(cheat => <CheatCard key={cheat._id} {...cheat} />)}
      </Section>)}
    </Fragment>
  );
};

SearchDisplay.defaultProps = {
  searchTerm: ''
};

SearchDisplay.propTypes = {
  cheats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string
};

const mapStateToProps = ({ cheatSheets }) => ({
  cheats: cheatSheets.cheats,
  loading: cheatSheets.makingApiRequest,
  searchTerm: cheatSheets.searchTerm.trim()
});

export default connect(mapStateToProps)(SearchDisplay);
