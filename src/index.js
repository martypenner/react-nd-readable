import 'muicss/dist/css/mui.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { fetchInitialData, updatePostsSortBy } from './redux';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import history from './utils/history';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const updateSortByFromUrl = ({ search }) => {
  const postsSortByQuery = new URLSearchParams(search).get('sortPostsBy');
  store.dispatch(updatePostsSortBy(postsSortByQuery));
};

store.dispatch(fetchInitialData());
updateSortByFromUrl(history.location);
// Listen for changes to the current location, and update the store's
// sortBy field accordingly
history.listen(updateSortByFromUrl);
