import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className='button'>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;