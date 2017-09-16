import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCategories = () => (
  <div className="mui--text-dark-secondary">No categories were found</div>
);

const Categories = ({ categories }) => (
  <div>
    <h2>Categories</h2>

    {categories.map(category => (
      <div key={category.name}>
        <Link to={`/${category.path}`}>{category.name}</Link>
      </div>
    ))}

    {categories.length === 0 && <EmptyCategories />}
  </div>
);

export default Categories;
