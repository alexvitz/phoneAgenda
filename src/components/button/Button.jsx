import React from 'react';

const Button = ({
  name = '',
  onClick = () => {},
  className = '',
  children,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
      {name}
    </button>
  );
};

export default Button;
