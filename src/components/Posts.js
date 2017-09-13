import React from 'react';
import { Link } from 'react-router-dom';

const EmptyPosts = () => (
  <div className="mui--text-dark-secondary">No posts were found</div>
);

const Posts = ({ posts }) => (
  <div>
    <h2>Posts</h2>

    {posts.map(post => (
      <div key={post.id}>
        <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
      </div>
    ))}

    {posts.length === 0 && <EmptyPosts />}
  </div>
);

export default Posts;
