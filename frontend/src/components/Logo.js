import React from 'react';
import logo from '../asset/logo.png'; // Adjust the path based on your file structure
const Logo = () => {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width: '143px', height: '80px' }} />
    </div>
  );
};

export default Logo;
