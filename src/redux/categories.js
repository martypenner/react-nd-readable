import { FETCH_CATEGORIES_SUCCEEDED } from './action-types';

export const initialCategories = [];

export const categoriesReducer = (state = initialCategories, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCEEDED:
      return state.concat(action.payload);
    default:
      return state;
  }
};
