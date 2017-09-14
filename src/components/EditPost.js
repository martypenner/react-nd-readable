import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import React from 'react';
import { connect } from 'react-redux';

import {
  getAllCategories,
  getEditingPost,
  updatePostAuthor,
  updatePostBody,
  updatePostCategory,
  updatePostTitle
} from '../redux';

const EditPost = ({
  post,
  categories,
  updatePostAuthor,
  updatePostBody,
  updatePostTitle,
  updatePostCategory
}) => (
  <div>
    <div>
      <TextField
        floatingLabelText="Author"
        hintText="The name of the author"
        value={post.author}
        onChange={e => updatePostAuthor(e.target.value)}
      />
    </div>
    <div>
      <TextField
        floatingLabelText="Title"
        value={post.title}
        onChange={e => updatePostTitle(e.target.value)}
      />
    </div>
    <div>
      <TextField
        multiLine={true}
        rows={10}
        floatingLabelText="Text"
        hintText="The main content of your post"
        value={post.body}
        onChange={e => updatePostBody(e.target.value)}
      />
    </div>

    <div>
      <SelectField
        floatingLabelText="Category"
        value={post.category}
        onChange={(_, __, value) => updatePostCategory(value)}
        maxHeight={200}>
        {categories.map(category => (
          <MenuItem
            key={category.name}
            value={category.name}
            primaryText={category.name}
          />
        ))}
      </SelectField>
    </div>

    <RaisedButton primary label="Submit" disabled />
  </div>
);

export default connect(
  state => ({
    post: getEditingPost(state),
    categories: getAllCategories(state)
  }),
  {
    updatePostAuthor,
    updatePostBody,
    updatePostTitle,
    updatePostCategory
  }
)(EditPost);
