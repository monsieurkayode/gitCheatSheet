import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { setSearchTerm } from '../../actions/cheatActions';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  padding: 12px 16px;

  .tag {
    background: #f8f9fa;
    padding: 5px 8px;
    color: rgba(0,0,0,0.3);
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    font-size: 14px;
    font-family: Roboto, sans-serif;
  }

  .divider::after {
    content: "/";
    margin-left: 10px;
    font-size: 24px;
    color: rgba(0,0,0,0.3);
  }

  .search {
    flex: 1 1 auto;
    margin: 0 20px 0 8px;
    height: 40px;
    border: none;
    font-size: 19px;
    font-family: Roboto, sans-serif;
  }

  .search-icon {
    font-size: 32px;
    color: #15234d;
  }

  @media only screen and (max-width: 424px) {
    padding: 6px 8px;
    height: 60px;

    .tag,
    .divider {
      display: none;
    }

    .search {
      font-size: 16px;
    }

    .search-icon {
      font-size: 28px;
    }
  }
`;

export const SearchBar = ({
  onChange,
  searchTerm
}) => (
  <Container>
    <span className="tag">gitcheatsheet</span>
    <span className="divider" />
    <input
      name="searchTerm"
      type="text"
      className="search"
      placeholder="Search..."
      onChange={e => onChange(e.target.value)}
      value={searchTerm}
    />
    <i className="material-icons search-icon">search</i>
  </Container>
);

SearchBar.defaultProps = {
  searchTerm: ''
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

export default connect(
  ({
    cheatSheets: { searchTerm }
  }) => ({ searchTerm }),
  { onChange: setSearchTerm }
)(SearchBar);
