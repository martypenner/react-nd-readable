import React from 'react';
import { connect } from 'react-redux';

import { getAllCategories, getAllPostsSortedByKey } from '../redux';
import Categories from './Categories';
import Posts from './Posts';

const Home = ({ posts, categories }) => (
  <div>
    <Categories categories={categories} />
    <Posts posts={posts} />
  </div>
);

export default connect(state => ({
  posts: getAllPostsSortedByKey(state, 'timestamp'),
  categories: getAllCategories(state)
}))(Home);
