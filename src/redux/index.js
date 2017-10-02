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

const commentsInitialState = {
  comments: {},
  editing: {}
};

const commentsReducer = (state = commentsInitialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCEEDED:
      if (!action.payload[0]) {
        return { ...state };
      }

      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload[0].parentId]: action.payload
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        editing: { ...state.editing, [action.payload]: true }
      };
    case SAVE_COMMENT_SUCCEEDED:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.parentId]: state.comments[action.payload.parentId]
            .filter(comment => comment.id !== action.payload.id)
            .concat(action.payload)
        },
        editing: {
          ...Object.keys(state.editing)
            .filter(id => id !== action.payload.id)
            .reduce((acc, id) => ({ ...acc, [id]: state.editing[id] }), {})
        }
      };
    case REMOVE_COMMENT_SUCCEEDED:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.parentId]: state.comments[
            action.payload.parentId
          ].filter(comment => comment.id !== action.payload.id)
        },
        editing: {
          ...Object.keys(state.editing)
            .filter(id => id !== action.payload.id)
            .reduce((acc, id) => ({ ...acc, [id]: state.editing[id] }), {})
        }
      };
    case VOTE_COMMENT_UP:
      const comment = action.payload;

      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.parentId]: state.comments[comment.parentId]
            .filter(c => comment.id !== c.id)
            .concat({ ...comment, voteScore: comment.voteScore + 1 })
        }
      };
    case VOTE_COMMENT_DOWN:
      const foundComment = action.payload;

      return {
        ...state,
        comments: {
          ...state.comments,
          [foundComment.parentId]: state.comments[foundComment.parentId]
            .filter(c => foundComment.id !== c.id)
            .concat({ ...foundComment, voteScore: foundComment.voteScore - 1 })
        }
      };
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

const EDIT_COMMENT = 'EDIT_COMMENT';

const REMOVE_COMMENT = 'REMOVE_COMMENT';
const REMOVE_COMMENT_SUCCEEDED = 'REMOVE_COMMENT_SUCCEEDED';
const REMOVE_COMMENT_FAILED = 'REMOVE_COMMENT_FAILED';

const SAVE_COMMENT = 'SAVE_COMMENT';
const SAVE_COMMENT_SUCCEEDED = 'SAVE_COMMENT_SUCCEEDED';
const SAVE_COMMENT_FAILED = 'SAVE_COMMENT_FAILED';

const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP';
const VOTE_COMMENT_UP_SUCCEEDED = 'VOTE_COMMENT_UP_SUCCEEDED';
const VOTE_COMMENT_UP_FAILED = 'VOTE_COMMENT_UP_FAILED';

const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN';
const VOTE_COMMENT_DOWN_SUCCEEDED = 'VOTE_COMMENT_DOWN_SUCCEEDED';
const VOTE_COMMENT_DOWN_FAILED = 'VOTE_COMMENT_DOWN_FAILED';

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

export const editComment = payload => ({ type: EDIT_COMMENT, payload });
export const removeComment = payload => ({ type: REMOVE_COMMENT, payload });
export const saveComment = payload => ({ type: SAVE_COMMENT, payload });
export const voteCommentUp = payload => ({ type: VOTE_COMMENT_UP, payload });
export const voteCommentDown = payload => ({
  type: VOTE_COMMENT_DOWN,
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

export const getAllComments = state => state.comments.comments;
export const getCommentsForPost = (state, postId) =>
  (state.comments.comments[postId] || [])
    .sort((a, b) => b.voteScore - a.voteScore);
export const isEditingComment = (state, commentId) =>
  state.comments.editing[commentId] || false;

const getAddingCommentIdsForPost = (state, postId) => {
  const editingComments = new Set(Object.keys(state.comments.editing));
  const commentIdsForPost = new Set(
    getCommentsForPost(state, postId).map(comment => comment.id)
  );
  const addingIds = new Set(
    [...editingComments].filter(id => !commentIdsForPost.has(id))
  );

  return addingIds;
};

export const isAddingNewComment = (state, postId) =>
  getAddingCommentIdsForPost(state, postId).size > 0;
export const getNewCommentId = (state, postId) =>
  getAddingCommentIdsForPost(state, postId)
    .values()
    .next().value;

/** Root reducer **/

const initialRootState = {
  posts: postsInitialState,
  categories: [],
  editing: initialEditingState,
  comments: commentsInitialState
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

// todo: saving an existing comment is different from saving a new comment
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
  votePostUpEpic,
  votePostDownEpic,
  fetchCommentsEpic,
  saveCommentEpic,
  removeCommentEpic,
  voteCommentUpEpic,
  voteCommentDownEpic
);
