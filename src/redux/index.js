import { routerReducer } from 'react-router-redux';
import { push } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Rx';
import uuid from 'uuid/v4';

import { apiBaseUrl, apiToken } from '../utils/api';

const initialPosts = [];

const postsReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case SAVE_POST_SUCCEEDED:
      return [...state, action.payload];
    case FETCH_POSTS_SUCCEEDED:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const initialCategories = [
  {
    name: 'react',
    path: 'react'
  },
  {
    name: 'redux',
    path: 'redux'
  },
  {
    name: 'udacity',
    path: 'udacity'
  }
];

const categoriesReducer = (state = initialCategories, action) => {
  switch (action.type) {
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

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_SUCCEEDED = 'FETCH_POSTS_SUCCEEDED';
const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

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

export const fetchPosts = () => ({ type: FETCH_POSTS });

const initialEditingState = {
  post: {
    author: '',
    title: '',
    body: '',
    category: initialCategories[0].name
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

export const getAllPosts = state => state.posts;
export const getAllPostsSortedByKey = (state, key) =>
  getAllPosts(state).sort((a, b) => a[key] - b[key]);
export const getPostById = (state, id) =>
  getAllPosts(state).find(post => String(post.id) === String(id));
export const getEditingPost = state => state.editing.post;
export const isSavingPost = state => state.editing.isSaving;

export const getAllCategories = state => state.categories;

/** Root reducer **/

const initialRootState = {
  posts: initialPosts,
  categories: initialCategories,
  editing: initialEditingState
};

const rootReducer = (state = initialRootState, action) => ({
  posts: postsReducer(state.posts, action),
  categories: categoriesReducer(state.categories, action),
  editing: editingPostReducer(state.editing, action),
  routing: routerReducer
});

export default rootReducer;

/** Epics **/

const fetchPostsEpic = action$ =>
  action$.ofType(FETCH_POSTS).mergeMap(() =>
    ajax
      .getJSON(`${apiBaseUrl}/posts`, {
        Accept: 'application/json',
        Authorization: apiToken
      })
      .map(response => ({
        type: FETCH_POSTS_SUCCEEDED,
        payload: response
      }))
      .catch(error =>
        Observable.of({
          type: FETCH_POSTS_FAILED,
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
          payload: post
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

export const rootEpic = combineEpics(savePostEpic, fetchPostsEpic);
