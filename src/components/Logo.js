import React from 'react';

import logo from '../logo.png';

const Logo = ({ size = 50 }) => (
  <img alt="Readable" src={logo} style={{ width: size, height: size }} />
);

export default Logo;
