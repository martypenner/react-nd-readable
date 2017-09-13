import * as colors from 'material-ui/styles/colors';
import * as moment from 'moment';
import React from 'react';
import Markdown from 'react-markdown';

const Comment = ({ comment }) => {
  const date = moment(comment.timestamp);

  return (
    <div key={comment.id} style={{ marginBottom: 20 }}>
      <p>
        <span className="author" style={{ color: colors.indigo500 }}>
          {comment.author}
        </span>
        <span
          className="mui--text-dark-secondary"
          style={{ fontWeight: 'bold' }}>
          {' • '}
          {comment.voteScore}
          {' point'}
          {comment.voteScore === 0 || comment.voteScore > 1 ? 's' : ''}
        </span>
        <span
          className="mui--text-caption mui--text-dark-hint"
          style={{ marginLeft: 5 }}>
          {' '}
          <time title={date.toISOString()} dateTime={date.toISOString()}>
            {date.fromNow()}
          </time>{' '}
        </span>
      </p>

      <Markdown source={comment.body} />
    </div>
  );
};

export default Comment;
