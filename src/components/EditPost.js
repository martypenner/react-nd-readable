import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import React from 'react';
import MenuItem from 'material-ui/MenuItem';

const EditPost = props => (
  <div>
    <div>
      <TextField floatingLabelText="Title" />
    </div>
    <div>
      <TextField
        multiLine={true}
        rows={10}
        floatingLabelText="Text"
        hintText="The main content of your post"
      />
    </div>

    <div>
      <SelectField
        floatingLabelText="Category"
        value={''}
        onChange={() => {}}
        maxHeight={200}>
        <MenuItem
          key={Math.random()}
          value={Math.random()}
          primaryText={`Item ${Math.random()}`}
        />

        <MenuItem
          key={Math.random()}
          value={Math.random()}
          primaryText={`Item ${Math.random()}`}
        />

        <MenuItem
          key={Math.random()}
          value={Math.random()}
          primaryText={`Item ${Math.random()}`}
        />
      </SelectField>
    </div>

    <RaisedButton primary label="Submit" disabled />
  </div>
);

export default EditPost;
