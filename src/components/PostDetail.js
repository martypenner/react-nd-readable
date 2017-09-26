import createClass from 'create-react-class';
import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import {
  fetchComments,
  getCommentsForPost,
  getPostById,
  votePostDown,
  votePostUp
} from '../redux';
import Comment from './Comment';
import PostHeader from './PostHeader';

const EmptyComments = () => (
  <div className="mui--text-dark-secondary">This post has no comments</div>
);

const PostDetail = createClass({
  componentWillMount() {
    this.props.fetchComments(this.props.match.params.postId);
  },

  render() {
    const { post, comments } = this.props;
    if (post == null) {
      return null;
    }

    return (
      <div>
        <PostHeader post={post} />

        <Markdown source={post.body} />

        <div>
          <h2 id="comments">Comments</h2>

          {comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))}

          {comments.length === 0 && <EmptyComments />}
        </div>
      </div>
    );
  }
});

export default connect(
  (state, { match }) => ({
    post: getPostById(state, match.params.postId),
    comments: getCommentsForPost(state, match.params.postId)
  }),
  {
    fetchComments,
    votePostUp,
    votePostDown
  }
)(PostDetail);
