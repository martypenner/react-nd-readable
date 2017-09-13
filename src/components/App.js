import Row from 'jsxstyle/Row';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import EditPost from './EditPost';
import Home from './Home';
import Logo from './Logo';
import NavLink from './NavLink';
import PostDetail from './PostDetail';
import PostsByCategory from './PostsByCategory';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Appbar style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
          <Row flex="1" alignItems="center">
            <Link
              to="/"
              className="mui--appbar-height"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#000'
              }}>
              <Logo />

              <span
                className="mui--text-headline"
                style={{ marginLeft: '1rem' }}>
                Readable
              </span>
            </Link>

            <div
              style={{
                marginLeft: 'auto' // Pin to the end of the row
              }}>
              <NavLink to="/edit/1">Add post</NavLink>
            </div>
          </Row>
        </Appbar>

        <Container fluid style={{ padding: '4rem' }}>
          <Route path="/" exact component={Home} />
          <Route path="/:category" component={PostsByCategory} />
          <Route path="/:category/:postId" component={PostDetail} />
          <Route path="/edit/:postId" component={EditPost} />
        </Container>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
