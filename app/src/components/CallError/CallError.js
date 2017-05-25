import React, { PropTypes } from 'react';
import './CallError.css';

export default function CallError({ message }) {
  return (
    <div className="CallError-container">
      <p className="CallError-message">{message}</p>
    </div>
  );
}

CallError.propTypes = {
  message: PropTypes.string.isRequired
};
