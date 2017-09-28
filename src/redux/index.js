import { push } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Rx';
import uuid from 'uuid/v4';

import { apiBaseUrl, apiToken } from '../utils/api';

const postsInitialState = { posts: [], sortBy: 'voteScore' };

const postsReducer = (state = postsInitialState, action) => {
  switch (action.type) {
    case SAVE_POST_SUCCEEDED:
    case FETCH_POSTS_SUCCEEDED:
      return { ...state, posts: state.posts.concat(action.payload) };
    case VOTE_POST_UP:
      const post = state.posts.find(post => post.id === action.payload);

      return {
        ...state,
        posts: state.posts
          .filter(post => post.id !== action.payload)
          .concat({ ...post, voteScore: post.voteScore + 1 })
      };
    case VOTE_POST_DOWN:
      const foundPost = state.posts.find(post => post.id === action.payload);

      return {
        ...state,
        posts: state.posts
          .filter(post => post.id !== action.payload)
          .concat({ ...foundPost, voteScore: foundPost.voteScore - 1 })
      };
    case UPDATE_POSTS_SORT_BY:
      const allowedSortCriteria = ['voteScore', 'timestamp', 'alphabetical'];

      return {
        ...state,
        sortBy: allowedSortCriteria.includes(action.payload)
          ? action.payload
          : allowedSortCriteria[0]
      };
    default:
      return state;
  }
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCEEDED:
      if (!action.payload[0]) {
        return { ...state };
      }

      return { ...state, [action.payload[0].parentId]: action.payload };
    default:
      return state;
  }
};

const initialCategories = [];

const categoriesReducer = (state = initialCategories, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCEEDED:
      return state.concat(action.payload);
    default:
      return state;
  }
};

const UPDATE_POST_AUTHOR = 'UPDATE_POST_AUTHOR';
const UPDATE_POST_BODY = 'UPDATE_POST_BODY';
const UPDATE_POST_TITLE = 'UPDATE_POST_TITLE';
const UPDATE_POST_CATEGORY = 'UPDATE_POST_CATEGORY';

const SAVE_POST = 'SAVE_POST';
const SAVE_POST_SUCCEEDED = 'SAVE_POST_SUCCEEDED';
const SAVE_POST_FAILED = 'SAVE_POST_FAILED';

const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA';

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_SUCCEEDED = 'FETCH_POSTS_SUCCEEDED';
const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const FETCH_CATEGORIES_SUCCEEDED = 'FETCH_CATEGORIES_SUCCEEDED';
const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';

const FETCH_COMMENTS = 'FETCH_COMMENTS';
const FETCH_COMMENTS_SUCCEEDED = 'FETCH_COMMENTS_SUCCEEDED';
const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';

const VOTE_POST_UP = 'VOTE_POST_UP';
const VOTE_POST_UP_SUCCEEDED = 'VOTE_POST_UP_SUCCEEDED';
const VOTE_POST_UP_FAILED = 'VOTE_POST_UP_FAILED';

const VOTE_POST_DOWN = 'VOTE_POST_DOWN';
const VOTE_POST_DOWN_SUCCEEDED = 'VOTE_POST_DOWN_SUCCEEDED';
const VOTE_POST_DOWN_FAILED = 'VOTE_POST_DOWN_FAILED';

const UPDATE_POSTS_SORT_BY = 'UPDATE_POSTS_SORT_BY';

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
export const votePostUp = payload => ({ type: VOTE_POST_UP, payload });
export const votePostDown = payload => ({ type: VOTE_POST_DOWN, payload });
export const updatePostsSortBy = payload => ({
  type: UPDATE_POSTS_SORT_BY,
  payload
});

const initialEditingState = {
  post: {
    author: '',
    title: '',
    body: '',
    category: ''
  },
  isSaving: false,
  error: null
};

const postReducer = (state = initialEditingState.post, action) => {
  switch (action.type) {
    case UPDATE_POST_AUTHOR:
      return { ...state, author: action.author };
    case UPDATE_POST_BODY:
      return { ...state, body: action.body };
    case UPDATE_POST_TITLE:
      return { ...state, title: action.title };
    case UPDATE_POST_CATEGORY:
      return { ...state, category: action.category };
    default:
      return state;
  }
};

const editingPostReducer = (state = initialEditingState, action) => {
  const newState = { ...state, post: postReducer(state.post, action) };

  switch (action.type) {
    case SAVE_POST:
      return { ...newState, isSaving: true };
    case SAVE_POST_FAILED:
      return { ...newState, isSaving: false, error: action.payload };
    case SAVE_POST_SUCCEEDED:
      return initialEditingState;
    default:
      return newState;
  }
};

/** Selectors **/

export const getAllPosts = state => state.posts.posts;
export const getAllPostsSorted = state => {
  const sortBy = getPostsSortBy(state);

  if (sortBy.toLowerCase() === 'alphabetical') {
    return getAllPosts(state).sort((a, b) =>
      a.title.localeCompare(b.title, 'en')
    );
  }

  return getAllPosts(state).sort((a, b) => b[sortBy] - a[sortBy]);
};
export const getPostsSortBy = state => state.posts.sortBy;
export const getPostById = (state, id) =>
  getAllPosts(state).find(post => String(post.id) === String(id));
export const getEditingPost = state => state.editing.post;
export const isSavingPost = state => state.editing.isSaving;

export const getAllCategories = state => state.categories;

export const getCommentsForPost = (state, postId) =>
  state.comments[postId] || [];

/** Root reducer **/

const initialRootState = {
  posts: postsInitialState,
  categories: [],
  editing: initialEditingState,
  comments: {}
};

const rootReducer = (state = initialRootState, action) => ({
  posts: postsReducer(state.posts, action),
  categories: categoriesReducer(state.categories, action),
  editing: editingPostReducer(state.editing, action),
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
      ...action.payload,
      id: uuid(),
      timestamp: Date.now(),
      comments: [],
      voteScore: 1
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
        }).concat(Observable.of(push('/')))
      )
      .catch(error =>
        Observable.of({
          type: SAVE_POST_FAILED,
          payload: error.xhr.response,
          error: true
        })
      );
  });

export const rootEpic = combineEpics(
  savePostEpic,
  fetchInitialDataEpic,
  fetchCommentsEpic,
  votePostUpEpic,
  votePostDownEpic
);
