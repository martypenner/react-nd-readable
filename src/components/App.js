import Row from 'jsxstyle/Row';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import EditPost from './EditPost';
import Home from './Home';
import Logo from './Logo';
import PostDetail from './PostDetail';
import PostsByCategory from './PostsByCategory';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <AppBar
          iconElementLeft={
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
              <Row alignItems="center">
                <Logo />

                <span style={{ marginLeft: 10 }}>Readable</span>
              </Row>
            </Link>
          }
        />

        <div className="app">
          <Link to="/">Home</Link>
          <br />
          <Link to="/posts-by-category/1">Posts by Category</Link>
          <br />
          <Link to="/post/1">Post Detail</Link>
          <br />
          <Link to="/edit/1">Edit Post</Link>
          <br />

          <Route path="/" exact component={Home} />
          <Route
            path="/posts-by-category/:categoryId"
            component={PostsByCategory}
          />
          <Route path="/post/:postId" component={PostDetail} />
          <Route path="/edit/:postId" component={EditPost} />
        </div>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
