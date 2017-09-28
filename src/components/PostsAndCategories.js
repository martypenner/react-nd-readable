import Row from 'jsxstyle/Row';
import Divider from 'muicss/lib/react/divider';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { getAllCategories, getAllPostsSorted, getPostsSortBy } from '../redux';
import Categories from './Categories';
import Posts from './Posts';

const sortMap = {
  voteScore: 'Vote score',
  timestamp: 'Date posted',
  alphabetical: 'Alphabetical'
};

const Home = ({ posts, categories, sortBy }) => (
  <div>
    <Categories categories={categories} />

    <h2>Posts</h2>

    <Row alignItems="center">
      <span style={{ marginRight: '2rem' }} className="mui--text-dark-secondary">
        Sort by
      </span>

      <Route
        render={({ location }) => {
          return (
            <ul className="mui-tabs__bar">
              {Object.keys(sortMap).map(key => (
                <li
                  key={key}
                  className={key === sortBy ? 'mui--is-active' : ''}>
                  <Link to={{ search: `?sortPostsBy=${key}` }}>{sortMap[key]}</Link>
                </li>
              ))}
            </ul>
          );
        }}
      />
    </Row>

    <Divider style={{ marginBottom: 20 }} />

    <Posts posts={posts} />
  </div>
);

export default connect((state, { match }) => ({
  posts: getAllPostsSorted(state).filter(
    post =>
      match.params.category ? post.category === match.params.category : true
  ),
  sortBy: getPostsSortBy(state),
  categories: getAllCategories(state)
}))(Home);
