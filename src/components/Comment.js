import Col from 'jsxstyle/Col';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import * as colors from 'material-ui/styles/colors';
import * as moment from 'moment';
import React from 'react';
import Markdown from 'react-markdown';

import Voter from './Voter';

const Comment = ({ comment }) => {
  const date = moment(comment.timestamp);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Flex>
        <Row alignItems="flex-start">
          <Voter voteScore={comment.voteScore} />

          <Col>
            <Row>
              <span className="author" style={{ color: colors.indigo500 }}>
                {comment.author}
              </span>

              <span
                className="mui--text-caption mui--text-dark-hint"
                style={{ marginLeft: '0.5rem', lineHeight: '2.2rem' }}>
                {' '}
                <time title={date.toISOString()} dateTime={date.toISOString()}>
                  {date.fromNow()}
                </time>{' '}
              </span>
            </Row>

            <Markdown source={comment.body} />
          </Col>
        </Row>
      </Flex>
    </div>
  );
};

export default Comment;
