import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import history from '../utils/history';
import rootReducer, { rootEpic } from './';

const epicMiddleware = createEpicMiddleware(rootEpic);
const routeMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware, routeMiddleware))
);

export default store;
