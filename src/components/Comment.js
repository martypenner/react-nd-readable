import createClass from 'create-react-class';
import Col from 'jsxstyle/Col';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import * as colors from 'material-ui/styles/colors';
import * as moment from 'moment';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import {
  editComment,
  removeComment,
  voteCommentDown,
  voteCommentUp
} from '../redux/actions';
import { isEditingComment } from '../redux/selectors';
import AddEditComment from './AddEditComment';
import Voter from './Voter';

const Comment = createClass({
  editComment() {
    const { comment, editComment } = this.props;
    editComment(comment.id);
  },

  removeComment() {
    const { comment, removeComment } = this.props;
    removeComment(comment);
  },

  render() {
    const { comment, isEditing, voteCommentUp, voteCommentDown } = this.props;
    const date = moment(comment.timestamp);

    return (
      <div style={{ marginBottom: '2rem' }}>
        <Flex style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <Row flex="1" alignItems="flex-start">
            <Voter
              voteScore={comment.voteScore}
              voteUp={() => voteCommentUp(comment)}
              voteDown={() => voteCommentDown(comment)}
            />

            <Col flex="1">
              {isEditing ? (
                <AddEditComment parentId={comment.parentId} comment={comment} />
              ) : (
                <div>
                  <Row>
                    <span
                      className="author"
                      style={{ color: colors.indigo500 }}>
                      {comment.author}
                    </span>

                    <span
                      className="mui--text-caption mui--text-dark-hint"
                      style={{
                        marginLeft: '0.5rem',
                        lineHeight: '2.2rem'
                      }}>
                      {' '}
                      <time
                        title={date.toISOString()}
                        dateTime={date.toISOString()}>
                        {date.fromNow()}
                      </time>{' '}
                    </span>
                  </Row>

                  <Markdown source={comment.body} />
                </div>
              )}
            </Col>

            <Dropdown
              label="Actions"
              style={{
                margin: 0,
                marginLeft: 'auto',
                position: 'relative',
                top: -14
              }}>
              <DropdownItem onClick={this.editComment}>Edit</DropdownItem>
              <DropdownItem onClick={this.removeComment} color="danger">
                Remove
              </DropdownItem>
            </Dropdown>
          </Row>
        </Flex>
      </div>
    );
  }
});

export default connect(
  (state, { comment }) => ({
    isEditing: isEditingComment(state, comment.id)
  }),
  { editComment, removeComment, voteCommentUp, voteCommentDown }
)(Comment);
