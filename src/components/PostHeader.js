import createClass from 'create-react-class';
import { Link } from 'react-router-dom';
import Col from 'jsxstyle/Col';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import * as moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import {
  fetchComments,
  getCommentsForPost,
  votePostDown,
  votePostUp
} from '../redux';
import Voter from './Voter';

const PostHeader = createClass({
  componentWillMount() {
    this.props.fetchComments(this.props.post.id);
  },

  render() {
    const { linkTitle, post, comments, votePostUp, votePostDown } = this.props;
    const submittedDate = moment(post.timestamp);
    const url = `/${post.category}/${post.id}`;

    return (
      <Flex style={{ marginBottom: '1rem' }}>
        <Row flex="1" justifyContent="space-between">
          <Voter
            voteScore={post.voteScore}
            voteUp={() => votePostUp(post.id)}
            voteDown={() => votePostDown(post.id)}
          />

          <Col flex="30">
            <div>
              <div
                className="mui--text-display1"
                style={{ marginBottom: '0.5rem' }}>
                {linkTitle ? <Link to={url}>{post.title}</Link> : post.title}
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

            <Link to={`${url}#comments`} rel="nofollow">
              {comments.length} comment{comments.length === 0 ||
              comments.length > 1 ? (
                's'
              ) : (
                ''
              )}
            </Link>
          </Col>
        </Row>
      </Flex>
    );
  }
});

export default connect(
  (state, ownProps) => ({
    comments: getCommentsForPost(state, ownProps.post.id)
  }),
  {
    fetchComments,
    votePostUp,
    votePostDown
  }
)(PostHeader);
