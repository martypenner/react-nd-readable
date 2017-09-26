import React from 'react';

import PostHeader from './PostHeader';

const EmptyPosts = () => (
  <div className="mui--text-dark-secondary">No posts were found</div>
);

const Posts = ({ posts }) => (
  <div>
    <h2>Posts</h2>

    {posts.map(post => (
      <div key={post.id}>
        <PostHeader post={post} linkTitle />
      </div>
    ))}

    {posts.length === 0 && <EmptyPosts />}
  </div>
);

export default Posts;
