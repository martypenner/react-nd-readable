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

import { editComment, isEditingComment } from '../redux';
import AddEditComment from './AddEditComment';
import Voter from './Voter';

const Comment = createClass({
  editComment() {
    const { comment, editComment } = this.props;
    editComment(comment.id);
  },

  render() {
    const { comment, isEditing } = this.props;
    const date = moment(comment.timestamp);

    return (
      <div style={{ marginBottom: '2rem' }}>
        <Flex style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <Row flex="1" alignItems="flex-start">
            <Voter voteScore={comment.voteScore} />

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
              <DropdownItem color="danger">Delete</DropdownItem>
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
  { editComment }
)(Comment);
