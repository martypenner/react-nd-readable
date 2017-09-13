import React from 'react';
import { connect } from 'react-redux';

import {
  getAllCategories,
  getAllPostsSortedByTime
} from '../redux/posts-categories';
import Categories from './Categories';
import Posts from './Posts';

const Home = ({ posts, categories }) => (
  <div>
    <Categories categories={categories} />
    <Posts posts={posts} />
  </div>
);

export default connect(state => ({
  posts: getAllPostsSortedByTime(state),
  categories: getAllCategories(state)
}))(Home);
