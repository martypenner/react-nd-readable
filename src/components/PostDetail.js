import Col from 'jsxstyle/Col';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import createClass from 'create-react-class';
import * as moment from 'moment';
import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import { getCommentsForPost, getPostById, fetchComments } from '../redux';
import Comment from './Comment';
import Voter from './Voter';

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

    const submittedDate = moment(post.timestamp);

    return (
      <div>
        <Flex style={{ marginBottom: '1rem' }}>
          <Row flex="1" justifyContent="space-between">
            <Voter voteScore={post.voteScore} />

            <Col flex="30">
              <div>
                <div
                  className="mui--text-display1"
                  style={{ marginBottom: '0.5rem' }}>
                  {post.title}
                </div>
                <div className="mui--text-caption mui--text-dark-secondary">
                  submitted{' '}
                  <time
                    title={submittedDate.toISOString()}
                    dateTime={submittedDate.toISOString()}>
                    {submittedDate.fromNow()}
                  </time>{' '}
                  by <span className="author">{post.author}</span>
                </div>
              </div>

              <a
                href={`${window.location.href.replace(
                  /(.+)#.*/gi,
                  '$1'
                )}#comments`}
                rel="nofollow">
                {comments.length} comment{comments.length === 0 ||
                comments.length > 1 ? (
                  's'
                ) : (
                  ''
                )}
              </a>
            </Col>
          </Row>
        </Flex>

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
    fetchComments
  }
)(PostDetail);
