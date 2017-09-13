import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getAllCategories,
  getAllPostsSortedByTime
} from '../redux/posts-categories';

const Posts = ({ posts, categories }) => (
  <div>
    <div>
      <h2>Categories</h2>

      {categories.map(category => (
        <div key={category.name}>
          <Link to={`/${category.path}`}>{category.name}</Link>
        </div>
      ))}
    </div>

    <div>
      <h2>Posts</h2>

      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  </div>
);

export default connect(state => ({
  posts: getAllPostsSortedByTime(state),
  categories: getAllCategories(state)
}))(Posts);
