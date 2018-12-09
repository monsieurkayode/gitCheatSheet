import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';

const LoaderWrapper = styled.div`
  &.loader {
    flex: ${({ loading }) => (loading ? 1 : 0)}
  }
`;
/**
 *
 * @function Loader
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const Loader = ({
  size,
  strokeColor,
  inline,
  loading
}) => (
  <LoaderWrapper
    style={{
      visibility: loading ? 'visible' : 'hidden'
    }}
    loading={loading}
    className={`${inline ? 'btn-loader' : 'loader'}`}
  >
    <PreloaderIcon
      loader={Oval}
      size={size}
      strokeWidth={12}
      strokeColor={strokeColor}
      duration={1200}
    />
  </LoaderWrapper>
);

Loader.defaultProps = {
  inline: false
};

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

export default Loader;
