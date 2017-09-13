import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = props => (
  <Link
    {...props}
    className="mui--text-title"
    style={{ marginLeft: '4rem', color: '#fff' }}>
    {props.children}
  </Link>
);

export default NavLink;
