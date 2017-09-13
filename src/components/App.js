import Row from 'jsxstyle/Row';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
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
        <Appbar style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Link
            to="/"
            className="mui--appbar-height"
            style={{
              display: 'flex',
              textDecoration: 'none',
              color: '#000'
            }}>
            <Row alignItems="center">
              <Logo />

              <span className="mui--text-headline" style={{ marginLeft: 10 }}>
                Readable
              </span>
            </Row>
          </Link>
        </Appbar>

        <Container fluid>
          <div style={{ marginBottom: 40 }}>
            <Link to="/">Home</Link>
            <br />
            <Link to="/posts-by-category/1">Posts by Category</Link>
            <br />
            <Link to="/post/1">Post Detail</Link>
            <br />
            <Link to="/edit/1">Edit Post</Link>
          </div>

          <Route path="/" exact component={Home} />
          <Route
            path="/posts-by-category/:categoryId"
            component={PostsByCategory}
          />
          <Route path="/post/:postId" component={PostDetail} />
          <Route path="/edit/:postId" component={EditPost} />
        </Container>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
