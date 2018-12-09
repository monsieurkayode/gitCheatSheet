import React from 'react';
import PropTypes from 'prop-types';

const CheatCommand = ({ command }) => {
  const [keyword, ...body] = command.split(' ');

  return (
    <pre className="command">
      <code>&#36;&nbsp;
        <span className="git">{keyword}</span>&nbsp;{body.join(' ')}
      </code>
    </pre>
  );
};

CheatCommand.propTypes = {
  command: PropTypes.string.isRequired
};

export default CheatCommand;
