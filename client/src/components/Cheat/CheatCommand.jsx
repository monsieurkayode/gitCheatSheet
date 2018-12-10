/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CheatCommand = ({ command, onCopy, id }) => {
  const [keyword, ...body] = command.split(' ');

  return (
    <pre
      onClick={() => {
        onCopy(id)
        setTimeout(() => onCopy(''), 1000)
      }}
      className="command"
    >
      <CopyToClipboard text={command}>
        <code>&#36;&nbsp;
          <span className="git">{keyword}</span>&nbsp;{body.join(' ')}
        </code>
      </CopyToClipboard>
    </pre>
  );
};

CheatCommand.propTypes = {
  command: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default CheatCommand;
