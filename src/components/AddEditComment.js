import createClass from 'create-react-class';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import * as moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import { saveComment } from '../redux';

const AddEditComment = createClass({
  getInitialState(...args) {
    return {
      autbor: '',
      datePosted: new Date(),
      timePosted: new Date(),
      body: ''
    };
  },

  componentDidMount() {
    const { comment } = this.props;
    if (comment) {
      this.setState({
        author: comment.author,
        datePosted: new Date(comment.timestamp),
        timePosted: new Date(comment.timestamp),
        body: comment.body
      });
    }
  },

  onAuthorChange(e) {
    this.setState({ author: e.target.value });
  },

  onBodyChange(e) {
    this.setState({ body: e.target.value });
  },

  onDatePostedChange(_, datePosted) {
    this.setState({ datePosted });
  },

  onTimePostedChange(_, timePosted) {
    this.setState({ timePosted });
  },

  saveComment() {
    const { comment, commentId, parentId, saveComment } = this.props;
    const { author, body, datePosted, timePosted } = this.state;

    saveComment({
      ...(comment ? comment : {}),
      ...(commentId ? { id: commentId } : {}),
      parentId,
      author,
      body,
      timestamp: moment(datePosted)
        .hours(timePosted.getHours())
        .minutes(timePosted.getMinutes())
        .seconds(timePosted.getSeconds())
        .valueOf()
    });
  },

  render() {
    const { author, datePosted, timePosted, body } = this.state;
    const canSubmitForm = author && datePosted && timePosted && body;

    return (
      <div>
        <div>
          <TextField
            floatingLabelText="Author"
            hintText="Your name"
            value={author}
            onChange={this.onAuthorChange}
          />
        </div>

        <DatePicker
          floatingLabelText="Comment posted date"
          hintText="The date shown as when the comment was posted"
          value={datePosted}
          onChange={this.onDatePostedChange}
        />

        <TimePicker
          floatingLabelText="Comment posted time"
          hintText="The time shown as when the comment was posted"
          value={timePosted}
          onChange={this.onTimePostedChange}
        />

        <div>
          <TextField
            multiLine={true}
            rows={3}
            rowsMax={10}
            floatingLabelText="Text"
            hintText="The main content of your comment"
            value={body}
            onChange={this.onBodyChange}
          />
        </div>

        <RaisedButton
          primary
          label="Submit"
          disabled={!canSubmitForm}
          onClick={this.saveComment}
        />
      </div>
    );
  }
});

export default connect(null, { saveComment })(AddEditComment);
