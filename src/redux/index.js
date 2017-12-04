import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Rx';
import uuid from 'uuid/v4';

import { apiBaseUrl, apiToken } from '../utils/api';
import history from '../utils/history';
import {
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_SUCCEEDED,
  FETCH_COMMENTS,
  FETCH_COMMENTS_FAILED,
  FETCH_COMMENTS_SUCCEEDED,
  FETCH_INITIAL_DATA,
  FETCH_POSTS_FAILED,
  FETCH_POSTS_SUCCEEDED,
  REMOVE_COMMENT,
  REMOVE_COMMENT_FAILED,
  REMOVE_COMMENT_SUCCEEDED,
  REMOVE_POST,
  REMOVE_POST_FAILED,
  REMOVE_POST_SUCCEEDED,
  SAVE_COMMENT,
  SAVE_COMMENT_FAILED,
  SAVE_COMMENT_SUCCEEDED,
  SAVE_POST,
  SAVE_POST_FAILED,
  SAVE_POST_SUCCEEDED,
  VOTE_COMMENT_DOWN,
  VOTE_COMMENT_DOWN_FAILED,
  VOTE_COMMENT_DOWN_SUCCEEDED,
  VOTE_COMMENT_UP,
  VOTE_COMMENT_UP_FAILED,
  VOTE_COMMENT_UP_SUCCEEDED,
  VOTE_POST_DOWN,
  VOTE_POST_DOWN_FAILED,
  VOTE_POST_DOWN_SUCCEEDED,
  VOTE_POST_UP,
  VOTE_POST_UP_FAILED,
  VOTE_POST_UP_SUCCEEDED
} from './action-types';
import { fetchCategories, fetchPosts } from './actions';
import { categoriesReducer } from './categories';
import { commentsInitialState } from './comments';
import { commentsReducer } from './comments';
import { initialEditingState, postsInitialState } from './posts';
import { editingPostReducer, postsReducer } from './posts';

const initialRootState = {
  posts: postsInitialState,
  categories: [],
  editing: initialEditingState,
  comments: commentsInitialState
};

const rootReducer = (state = initialRootState, action) => ({
  posts: postsReducer(state.posts, action),
  editing: editingPostReducer(state.editing, action),
  categories: categoriesReducer(state.categories, action),
  comments: commentsReducer(state.comments, action)
});

export default rootReducer;

/** Epics **/

const fetchInitialDataEpic = action$ =>
  action$.ofType(FETCH_INITIAL_DATA).switchMap(() =>
    Observable.zip(
      Observable.of(fetchCategories()).concat(
        ajax
          .getJSON(`${apiBaseUrl}/categories`, {
            Accept: 'application/json',
            Authorization: apiToken
          })
          .map(response => ({
            type: FETCH_CATEGORIES_SUCCEEDED,
            payload: response.categories
          }))
          .catch(error =>
            Observable.of({
              type: FETCH_CATEGORIES_FAILED,
              payload: error.xhr.response,
              error: true
            })
          )
      ),
      Observable.of(fetchPosts()).concat(
        ajax
          .getJSON(`${apiBaseUrl}/posts`, {
            Accept: 'application/json',
            Authorization: apiToken
          })
          .map(posts => ({
            type: FETCH_POSTS_SUCCEEDED,
            payload: posts
          }))
          .catch(error =>
            Observable.of({
              type: FETCH_POSTS_FAILED,
              payload: error.xhr.response,
              error: true
            })
          )
      )
    ).mergeMap(actions => Observable.from(actions))
  );

export const fetchCommentsEpic = action$ =>
  action$.ofType(FETCH_COMMENTS).mergeMap(action =>
    ajax
      .getJSON(`${apiBaseUrl}/posts/${action.payload}/comments`, {
        Accept: 'application/json',
        Authorization: apiToken
      })
      .map(comments => ({
        type: FETCH_COMMENTS_SUCCEEDED,
        payload: comments
      }))
      .catch(error =>
        Observable.of({
          type: FETCH_COMMENTS_FAILED,
          payload: error.xhr.response,
          error: true
        })
      )
  );

export const votePostUpEpic = action$ =>
  action$.ofType(VOTE_POST_UP).mergeMap(action =>
    ajax
      .post(
        `${apiBaseUrl}/posts/${action.payload}`,
        { option: 'upVote' },
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: apiToken
        }
      )
      .map(response => ({
        type: VOTE_POST_UP_SUCCEEDED,
        payload: response
      }))
      .catch(error =>
        Observable.of({
          type: VOTE_POST_UP_FAILED,
          payload: error.xhr.response,
          error: true
        })
      )
  );

export const votePostDownEpic = action$ =>
  action$.ofType(VOTE_POST_DOWN).mergeMap(action =>
    ajax
      .post(
        `${apiBaseUrl}/posts/${action.payload}`,
        { option: 'downVote' },
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: apiToken
        }
      )
      .map(response => ({
        type: VOTE_POST_DOWN_SUCCEEDED,
        payload: response
      }))
      .catch(error =>
        Observable.of({
          type: VOTE_POST_DOWN_FAILED,
          payload: error.xhr.response,
          error: true
        })
      )
  );

const savePostEpic = action$ =>
  action$.ofType(SAVE_POST).mergeMap(action => {
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      voteScore: 1,
      ...action.payload
    };

    return ajax
      .post(`${apiBaseUrl}/posts`, post, {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: apiToken
      })
      .mergeMap(response =>
        Observable.of({
          type: SAVE_POST_SUCCEEDED,
          payload: response.response
        })
      )
      .do(() => history.push('/'))
      .catch(error =>
        Observable.of({
          type: SAVE_POST_FAILED,
          payload: error.xhr.response,
          error: true
        })
      );
  });

const removePostEpic = action$ =>
  action$.ofType(REMOVE_POST).mergeMap(action =>
    Observable.defer(() => Observable.of(window.confirm('Remove the post?')))
      .filter(c => c)
      .mergeMap(() =>
        ajax
          .delete(`${apiBaseUrl}/posts/${action.payload.id}`, {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: apiToken
          })
          .map(response => ({
            type: REMOVE_POST_SUCCEEDED,
            payload: action.payload.id
          }))
          .catch(error =>
            Observable.of({
              type: REMOVE_POST_FAILED,
              payload: error.xhr.response,
              error: true
            })
          )
      )
  );

const saveCommentEpic = action$ =>
  action$.ofType(SAVE_COMMENT).mergeMap(action =>
    ajax
      .post(`${apiBaseUrl}/comments`, action.payload, {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: apiToken
      })
      .map(response => ({
        type: SAVE_COMMENT_SUCCEEDED,
        payload: response.response
      }))
      .catch(error =>
        Observable.of({
          type: SAVE_COMMENT_FAILED,
          payload: error.xhr.response,
          error: true
        })
      )
  );

const removeCommentEpic = action$ =>
  action$.ofType(REMOVE_COMMENT).mergeMap(action =>
    Observable.defer(() => Observable.of(window.confirm('Remove the comment?')))
      .filter(c => c)
      .mergeMap(() =>
        ajax
          .delete(`${apiBaseUrl}/comments/${action.payload.id}`, {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: apiToken
          })
          .map(response => ({
            type: REMOVE_COMMENT_SUCCEEDED,
            payload: response.response
          }))
          .catch(error =>
            Observable.of({
              type: REMOVE_COMMENT_FAILED,
              payload: error.xhr.response,
              error: true
            })
          )
      )
  );

export const voteCommentUpEpic = action$ =>
  action$.ofType(VOTE_COMMENT_UP).mergeMap(action =>
    ajax
      .post(
        `${apiBaseUrl}/comments/${action.payload.id}`,
        { option: 'upVote' },
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: apiToken
        }
      )
      .map(response => ({
        type: VOTE_COMMENT_UP_SUCCEEDED,
        payload: response
      }))
      .catch(error =>
        Observable.of({
          type: VOTE_COMMENT_UP_FAILED,
          payload: error.xhr.response,
          error: true
        })
      )
  );

export const voteCommentDownEpic = action$ =>
  action$.ofType(VOTE_COMMENT_DOWN).mergeMap(action =>
    ajax
      .post(
        `${apiBaseUrl}/comments/${action.payload.id}`,
        { option: 'downVote' },
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: apiToken
        }
      )
      .map(response => ({
        type: VOTE_COMMENT_DOWN_SUCCEEDED,
        payload: response
      }))
      .catch(error =>
        Observable.of({
          type: VOTE_COMMENT_DOWN_FAILED,
          payload: error.xhr.response,
          error: true
        })
      )
  );

export const rootEpic = combineEpics(
  fetchInitialDataEpic,
  savePostEpic,
  removePostEpic,
  votePostUpEpic,
  votePostDownEpic,
  fetchCommentsEpic,
  saveCommentEpic,
  removeCommentEpic,
  voteCommentUpEpic,
  voteCommentDownEpic
);
