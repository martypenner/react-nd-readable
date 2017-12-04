import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import React from 'react';
import { connect } from 'react-redux';

import {
  savePost,
  updatePostAuthor,
  updatePostBody,
  updatePostCategory,
  updatePostTitle
} from '../redux/actions';
import {
  getAllCategories,
  getEditingPost,
  isSavingPost
} from '../redux/selectors';

const EditPost = ({
  post,
  categories,
  canSubmitForm,
  updatePostAuthor,
  updatePostBody,
  updatePostTitle,
  updatePostCategory,
  savePost
}) => (
  <div>
    <div>
      <TextField
        floatingLabelText="Author"
        hintText="Your name"
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
        onChange={(...params) => updatePostCategory(params[2])}
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

    <RaisedButton
      primary
      label="Submit"
      disabled={!canSubmitForm}
      onClick={() => savePost(post)}
    />
  </div>
);

export default connect(
  () => state => {
    const post = getEditingPost(state);
    const requiredFields = ['author', 'title', 'body', 'category'];

    return {
      post,
      categories: getAllCategories(state),
      canSubmitForm:
        !isSavingPost(state) &&
        requiredFields.filter(field => Boolean(post[field])).length ===
          requiredFields.length
    };
  },
  {
    updatePostAuthor,
    updatePostBody,
    updatePostTitle,
    updatePostCategory,
    savePost
  }
)(EditPost);
