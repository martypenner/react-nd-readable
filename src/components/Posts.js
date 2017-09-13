import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts }) => (
  <div>
    <h2>Posts</h2>

    {posts.map(post => (
      <div key={post.id}>
        <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
      </div>
    ))}
  </div>
);

export default Posts;
