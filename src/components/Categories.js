import React from 'react';
import { Link } from 'react-router-dom';

const Categories = ({ categories }) => (
  <div>
    <h2>Categories</h2>

    {categories.map(category => (
      <div key={category.name}>
        <Link to={`/${category.path}`}>{category.name}</Link>
      </div>
    ))}
  </div>
);

export default Categories;
