import React from 'react';
import PropTypes from 'prop-types';
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';

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
  <div
    style={{ visibility: loading ? 'visible' : 'hidden' }}
    className={`loader ${inline ? 'btn-loader' : ''}`}
  >
    <PreloaderIcon
      loader={Oval}
      size={size}
      strokeWidth={12}
      strokeColor={strokeColor}
      duration={1200}
    />
  </div>
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
