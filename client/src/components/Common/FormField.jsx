import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FieldWrapper = styled.div`
  .icon {
    font-size: 32px;
    -webkit-text-fill-color: #15234d;
    order: -1;
  }

  input[type="text"],
  input[type="password"] {
    width: 60%;
    margin-left: 10px;
    line-height: 32px;
    border: unset;
    border-bottom: 2px solid #668090;
    background: #f1f3f5;
    font-size: 14px;
    font-family: Roboto, sans-serif;
    letter-spacing: 1.5px;

    &:focus {
      border-bottom: 2px solid #6756b3;
    }

    &.invalid {
      border-bottom: 2px solid crimson;
    }

    &.valid {
      border-bottom: 2px solid teal;
    }

    @media only screen and (max-width: 480px) {
      width: 80%;
    }
  }

  input:focus + .icon {
    -webkit-text-fill-color: #6756b3;
  }

  .error {
    width: 60%;
    font-size: 12px;
    color: crimson;
    font-family: Roboto, sans-serif;
    margin-top: 6px;
    text-align: right;
    transform: translateX(22px);

    @media only screen and (max-width: 480px) {
      width: 80%;
    }
  }
`;

const FormField = ({
  placeholder,
  icon,
  name,
  value,
  type,
  error,
  onChange,
  onBlur,
  loading
}) => (
  <FieldWrapper className="form-field">
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={error.length > 0 ? 'invalid' : ''}
      readOnly={loading}
    />
    <i className="material-icons icon">{icon}</i>
    <div className="error">&nbsp;{error}</div>
  </FieldWrapper>
);

FormField.defaultProps = {
  value: '',
  type: 'text',
  error: ''
};

FormField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default FormField;
