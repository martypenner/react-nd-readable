import React from 'react';
import { connect } from 'react-redux';

import {
  getAllCategories,
  getAllPostsSortedByKey
} from '../redux/posts-categories';
import Categories from './Categories';
import Posts from './Posts';

const PostsByCategory = ({ posts, categories }) => (
  <div>
    <Categories categories={categories} />
    <Posts posts={posts} />
  </div>
);

export default connect((state, { match }) => ({
  posts: getAllPostsSortedByKey(state, 'timestamp').filter(
    post => post.category === match.params.category
  ),
  categories: getAllCategories(state)
}))(PostsByCategory);
