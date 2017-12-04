import {
  EDIT_COMMENT,
  EDIT_POST,
  FETCH_CATEGORIES,
  FETCH_COMMENTS,
  FETCH_INITIAL_DATA,
  FETCH_POSTS,
  REMOVE_COMMENT,
  REMOVE_POST,
  SAVE_COMMENT,
  SAVE_POST,
  UPDATE_POST_AUTHOR,
  UPDATE_POST_BODY,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_TITLE,
  UPDATE_POSTS_SORT_BY,
  VOTE_COMMENT_DOWN,
  VOTE_COMMENT_UP,
  VOTE_POST_DOWN,
  VOTE_POST_UP
} from './action-types';

export const updatePostAuthor = author => ({
  type: UPDATE_POST_AUTHOR,
  author
});

export const updatePostBody = body => ({
  type: UPDATE_POST_BODY,
  body
});

export const updatePostTitle = title => ({
  type: UPDATE_POST_TITLE,
  title
});

export const updatePostCategory = category => ({
  type: UPDATE_POST_CATEGORY,
  category
});

export const savePost = payload => ({
  type: SAVE_POST,
  payload
});

export const fetchInitialData = () => ({ type: FETCH_INITIAL_DATA });
export const fetchCategories = () => ({ type: FETCH_CATEGORIES });
export const fetchPosts = () => ({ type: FETCH_POSTS });
export const fetchComments = payload => ({ type: FETCH_COMMENTS, payload });
export const editPost = payload => ({ type: EDIT_POST, payload });
export const removePost = payload => ({ type: REMOVE_POST, payload });
export const votePostUp = payload => ({ type: VOTE_POST_UP, payload });
export const votePostDown = payload => ({ type: VOTE_POST_DOWN, payload });
export const updatePostsSortBy = payload => ({
  type: UPDATE_POSTS_SORT_BY,
  payload
});

export const editComment = payload => ({ type: EDIT_COMMENT, payload });
export const removeComment = payload => ({ type: REMOVE_COMMENT, payload });
export const saveComment = payload => ({ type: SAVE_COMMENT, payload });
export const voteCommentUp = payload => ({ type: VOTE_COMMENT_UP, payload });
export const voteCommentDown = payload => ({
  type: VOTE_COMMENT_DOWN,
  payload
});
