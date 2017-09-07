import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';

const App = () => (
  <MuiThemeProvider>
    <div>
      <FlatButton>Hello world</FlatButton>
    </div>
  </MuiThemeProvider>
);

export default App;
