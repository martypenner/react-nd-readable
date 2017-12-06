import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <h3 style={{ marginBottom: '2rem' }}>
    The post you are looking for could not be found.{' '}
    <Link to="/">Maybe try another category?</Link>
  </h3>
);

export default NotFound;
