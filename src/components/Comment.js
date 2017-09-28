import Col from 'jsxstyle/Col';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import * as moment from 'moment';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import { componentFromStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs';

import { editComment, isEditingComment, saveComment } from '../redux';
import Voter from './Voter';

const Comment = componentFromStream(props$ => {
  const { handler: updateAuthor, stream: author$ } = createEventHandler();
  const { handler: updateDate, stream: date$ } = createEventHandler();
  const { handler: updateTime, stream: time$ } = createEventHandler();
  const { handler: updateBody, stream: body$ } = createEventHandler();

  return props$
    .mergeMap(props =>
      Observable.combineLatest(
        author$.startWith(props.comment.author),
        date$.startWith(new Date(props.comment.timestamp)),
        time$.startWith(new Date(props.comment.timestamp)),
        body$.startWith(props.comment.body),
        (author, datePosted, timePosted, body) => ({
          ...props,
          canSubmitForm: author && datePosted && timePosted && body,
          author,
          datePosted,
          timePosted,
          body
        })
      )
    )
    .map(
      ({
        comment,
        isEditing,
        editComment,
        saveComment,
        canSubmitForm,
        author,
        datePosted,
        timePosted,
        body
      }) => {
        const date = moment(comment.timestamp);

        return (
          <div style={{ marginBottom: '2rem' }}>
            <Flex style={{ padding: '1rem', border: '1px solid #ccc' }}>
              <Row flex="1" alignItems="flex-start">
                <Voter voteScore={comment.voteScore} />

                <Col flex="1">
                  {isEditing ? (
                    <div>
                      <div>
                        <TextField
                          floatingLabelText="Author"
                          hintText="Your name"
                          value={author}
                          onChange={e => updateAuthor(e.target.value)}
                        />
                      </div>

                      <DatePicker
                        floatingLabelText="Comment posted date"
                        hintText="The date shown as when the comment was posted"
                        value={datePosted}
                        onChange={(_, value) => updateDate(value)}
                      />

                      <TimePicker
                        floatingLabelText="Comment posted time"
                        hintText="The time shown as when the comment was posted"
                        value={timePosted}
                        onChange={(_, value) => updateTime(value)}
                      />

                      <div>
                        <TextField
                          multiLine={true}
                          rows={3}
                          rowsMax={10}
                          floatingLabelText="Text"
                          hintText="The main content of your comment"
                          value={body}
                          onChange={e => updateBody(e.target.value)}
                        />
                      </div>

                      <RaisedButton
                        primary
                        label="Submit"
                        disabled={!canSubmitForm}
                        onClick={() =>
                          saveComment({
                            ...comment,
                            author,
                            body,
                            timestamp: moment(datePosted)
                              .hours(timePosted.getHours())
                              .minutes(timePosted.getMinutes())
                              .seconds(timePosted.getSeconds())
                              .valueOf()
                          })}
                      />
                    </div>
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
                  <DropdownItem onClick={() => editComment(comment.id)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem color="danger">Delete</DropdownItem>
                </Dropdown>
              </Row>
            </Flex>
          </div>
        );
      }
    );
});

export default connect(
  (state, { comment }) => ({
    isEditing: isEditingComment(state, comment.id)
  }),
  { editComment, saveComment }
)(Comment);
