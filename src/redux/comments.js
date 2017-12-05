import {
  EDIT_COMMENT,
  FETCH_COMMENTS_SUCCEEDED,
  REMOVE_COMMENT_SUCCEEDED,
  SAVE_COMMENT_SUCCEEDED,
  VOTE_COMMENT_DOWN,
  VOTE_COMMENT_UP
} from './action-types';

export const commentsInitialState = {
  comments: {},
  editing: {}
};

export const commentsReducer = (state = commentsInitialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCEEDED:
      if (!action.payload[0]) {
        return { ...state };
      }

      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload[0].parentId]: action.payload.filter(
            c => !c.deleted && !c.parentDeleted
          )
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
          [action.payload.parentId]: (state.comments[action.payload.parentId] ||
            [])
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
