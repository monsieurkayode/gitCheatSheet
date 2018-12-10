/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from '../Common/SearchBar';
import Container from '../Common/Container';
import CheatCard from '../Cheat/CheatCard';
import NoContent from '../Common/NoContent';

const Section = styled.section`
  column-count: auto;
  column-width: 360px;
  margin-top: 20px;
  max-width: 1232px;
  margin-top: 60px;
  flex: 1;
  width: 100%;
`;

const NotFound = styled(NoContent)`
  flex: 1
`;

export class SearchPage extends Component {
  static propTypes = {
    cheats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loading: PropTypes.bool.isRequired
  }

  state = { searchTerm: '' }

  handleSearchTermChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { searchTerm } = this.state;
    const { cheats, loading } = this.props;

    const filteredCheats = cheats
      .filter((cheat) => {
        const keyword = searchTerm.toLowerCase();
        return (
          cheat.category.name.toLowerCase().includes(keyword)
          || cheat.keywords.includes(keyword)
          || cheat.description.toLowerCase().includes(keyword)
        );
      });

    return (
      <Fragment>
        <Container style={{ marginBottom: 0, flex: 0 }}>
          <SearchBar
            onChange={this.handleSearchTermChange}
            searchTerm={searchTerm}
            onFocus={() => {}}
            search
          />
        </Container>
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
  }
}

const mapStateToProps = ({ cheatSheets }) => ({
  cheats: cheatSheets.cheats,
  loading: cheatSheets.makingApiRequest
});

export default connect(mapStateToProps)(SearchPage);
