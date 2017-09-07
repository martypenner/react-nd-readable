import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import EditPost from './EditPost';
import Home from './Home';
import PostDetail from './PostDetail';
import PostsByCategory from './PostsByCategory';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/posts-by-category/1">Posts by Category</Link>
        <Link to="/post/1">Post Detail</Link>
        <Link to="/edit/1">Edit Post</Link>

        <Route path="/" exact component={Home} />
        <Route
          path="/posts-by-category/:categoryId"
          component={PostsByCategory}
        />
        <Route path="/post/:postId" component={PostDetail} />
        <Route path="/edit/:postId" component={EditPost} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
