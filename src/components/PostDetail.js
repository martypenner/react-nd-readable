import Col from 'jsxstyle/Col';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import * as moment from 'moment';
import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import { getPostById } from '../redux';
import Comment from './Comment';
import Voter from './Voter';

const PostDetail = ({ post }) => {
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
              {post.comments.length} comment{post.comments.length === 0 ||
              post.comments.length > 1 ? (
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

        {post.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default connect((state, { match }) => ({
  post: getPostById(state, match.params.postId)
}))(PostDetail);
