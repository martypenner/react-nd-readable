import {
  EDIT_POST,
  FETCH_POSTS_SUCCEEDED,
  REMOVE_POST_SUCCEEDED,
  SAVE_POST,
  SAVE_POST_FAILED,
  SAVE_POST_SUCCEEDED,
  UPDATE_POST_AUTHOR,
  UPDATE_POST_BODY,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_TITLE,
  UPDATE_POSTS_SORT_BY,
  VOTE_POST_DOWN,
  VOTE_POST_UP
} from './action-types';

export const postsInitialState = { posts: [], sortBy: 'voteScore' };

export const postsReducer = (state = postsInitialState, action) => {
  switch (action.type) {
    case SAVE_POST_SUCCEEDED:
      return {
        ...state,
        posts: state.posts
          .filter(post => post.id !== action.payload.id)
          .concat({ comments: [], ...action.payload })
      };
    case FETCH_POSTS_SUCCEEDED:
      return {
        ...state,
        posts: state.posts.concat(action.payload.filter(p => !p.deleted))
      };
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
    case REMOVE_POST_SUCCEEDED:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    default:
      return state;
  }
};

export const initialEditingState = {
  post: {
    author: '',
    title: '',
    body: '',
    category: ''
  },
  isSaving: false,
  error: null
};

export const postReducer = (state = initialEditingState.post, action) => {
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

export const editingPostReducer = (state = initialEditingState, action) => {
  const newState = { ...state, post: postReducer(state.post, action) };

  switch (action.type) {
    case SAVE_POST:
      return { ...newState, isSaving: true };
    case SAVE_POST_FAILED:
      return { ...newState, isSaving: false, error: action.payload };
    case SAVE_POST_SUCCEEDED:
      return initialEditingState;
    case EDIT_POST:
      return {
        ...state,
        post: action.payload
      };
    default:
      return newState;
  }
};
