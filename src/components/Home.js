import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts = postsDummy, categories = categoriesDummy }) => (
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

const postsDummy = [
  {
    id: 1,
    title: 'This is some interesting street art.',
    author: 'Timigos',
    timestamp: Date.now(),
    voteScore: 17,
    category: 'react'
  }
];

const categoriesDummy = [
  {
    name: 'react',
    path: 'react'
  },
  {
    name: 'redux',
    path: 'redux'
  },
  {
    name: 'udacity',
    path: 'udacity'
  }
];

export default Posts;
