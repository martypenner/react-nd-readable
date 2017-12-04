import createClass from 'create-react-class';
import Col from 'jsxstyle/Col';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import * as moment from 'moment';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import {
  editPost,
  fetchComments,
  removePost,
  votePostDown,
  votePostUp
} from '../redux/actions';
import { getCommentsForPost, getEditingPost } from '../redux/selectors';
import Voter from './Voter';

const PostHeaderView = createClass({
  componentWillMount() {
    this.props.fetchComments(this.props.post.id);
  },

  editPost() {
    const { post, editPost, history } = this.props;
    editPost(post);
    history.push(`/edit/${post.id}`);
  },

  removePost() {
    const { post, removePost } = this.props;
    removePost(post);
  },

  render() {
    const { linkTitle, post, comments, votePostUp, votePostDown } = this.props;
    const submittedDate = moment(post.timestamp);
    const url = `/${post.category}/${post.id}`;

    return (
      <Flex style={{ marginBottom: '1rem' }}>
        <Row flex="1" justifyContent="space-between">
          <div style={{ marginTop: '0.7rem' }}>
            <Voter
              voteScore={post.voteScore}
              voteUp={() => votePostUp(post.id)}
              voteDown={() => votePostDown(post.id)}
            />
          </div>

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

            <Link to={{ pathname: url, hash: '#comments' }} rel="nofollow">
              {comments.length} comment{comments.length === 0 ||
              comments.length > 1 ? (
                's'
              ) : (
                ''
              )}
            </Link>
          </Col>

          <Dropdown
            label="Actions"
            style={{
              margin: 0,
              marginLeft: 'auto',
              position: 'relative',
              top: -14
            }}>
            <DropdownItem onClick={this.editPost}>Edit</DropdownItem>
            <DropdownItem onClick={this.removePost} color="danger">
              Remove
            </DropdownItem>
          </Dropdown>
        </Row>
      </Flex>
    );
  }
});

// Wrap it in a route so we have history
const PostHeader = props => (
  <Route render={navProps => <PostHeaderView {...navProps} {...props} />} />
);

export default connect(
  (state, { post }) => ({
    comments: getCommentsForPost(state, post.id),
    isEditing: getEditingPost(state) != null
  }),
  {
    fetchComments,
    editPost,
    removePost,
    votePostUp,
    votePostDown
  }
)(PostHeader);
