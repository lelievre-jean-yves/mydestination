import React from 'react';
import PropTypes from 'prop-types';

export function ItemValidationPassword({ text, className }) {
  return <li className={className}>{text}</li>;
}

ItemValidationPassword.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
