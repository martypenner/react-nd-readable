import Col from 'jsxstyle/Col';
import * as colors from 'material-ui/styles/colors';
import React from 'react';
import ThumbDown from 'react-icons/lib/md/thumb-down';
import ThumbUp from 'react-icons/lib/md/thumb-up';

const Voter = ({ voteScore, voteUp, voteDown }) => (
  <Col style={{ minWidth: '4.4rem' }} className="mui--text-dark-secondary">
    <span style={{ cursor: 'pointer' }} onClick={voteUp}>
      <ThumbUp
        color={colors.indigo500}
        role="button"
        aria-label="upvote"
        tabIndex="0"
      />
    </span>
    <span>{voteScore}</span>
    <span style={{ cursor: 'pointer' }} onClick={voteDown}>
      <ThumbDown
        color={colors.red500}
        role="button"
        aria-label="downvote"
        tabIndex="0"
      />
    </span>
  </Col>
);

export default Voter;
