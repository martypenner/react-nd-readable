import createClass from 'create-react-class';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import {
  editComment,
  fetchComments,
  votePostDown,
  votePostUp
} from '../redux/actions';
import {
  getAllPosts,
  getCommentsForPost,
  getNewCommentId,
  getPostById,
  isAddingNewComment
} from '../redux/selectors';
import history from '../utils/history';
import AddEditComment from './AddEditComment';
import Comment from './Comment';
import PostHeader from './PostHeader';

const EmptyComments = () => (
  <div className="mui--text-dark-secondary">This post has no comments</div>
);

const PostDetail = createClass({
  componentWillMount() {
    const { fetchComments, match } = this.props;
    fetchComments(match.params.postId);
  },

  editComment() {
    const { editComment } = this.props;
    editComment(uuid());
  },

  render() {
    const { post, allPosts, comments, isAddingNew, newCommentId } = this.props;

    if (post == null) {
      // Redirect to root if posts have been fetched, and no post with the given ID exist
      if (allPosts.length > 0) {
        history.replace('/');
      }

      return null;
    }

    return (
      <div>
        <PostHeader post={post} />

        <Markdown source={post.body} />

        <div>
          <h2 id="comments">Comments</h2>

          {isAddingNew ? (
            <div style={{ marginBottom: '2rem' }}>
              <AddEditComment commentId={newCommentId} parentId={post.id} />
            </div>
          ) : (
            <FlatButton
              size="small"
              label="Add comment"
              onClick={this.editComment}
            />
          )}

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
    allPosts: getAllPosts(state),
    comments: getCommentsForPost(state, match.params.postId),
    isAddingNew: isAddingNewComment(state, match.params.postId),
    newCommentId: getNewCommentId(state, match.params.postId)
  }),
  {
    fetchComments,
    votePostUp,
    votePostDown,
    editComment
  }
)(PostDetail);
