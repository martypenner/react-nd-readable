export const getAllPosts = state => state.posts.posts;
export const getAllPostsSorted = state => {
  const sortBy = getPostsSortBy(state);

  if (sortBy.toLowerCase() === 'alphabetical') {
    return getAllPosts(state).sort((a, b) =>
      a.title.localeCompare(b.title, 'en')
    );
  }

  return getAllPosts(state).sort((a, b) => b[sortBy] - a[sortBy]);
};
export const getPostsSortBy = state => state.posts.sortBy;
export const getPostById = (state, id) =>
  getAllPosts(state).find(post => String(post.id) === String(id));
export const getEditingPost = state => state.editing.post;
export const isSavingPost = state => state.editing.isSaving;

export const getAllCategories = state => state.categories;

export const getAllComments = state => state.comments.comments;
export const getCommentsForPost = (state, postId) =>
  (state.comments.comments[postId] || [])
    .sort((a, b) => b.voteScore - a.voteScore);
export const isEditingComment = (state, commentId) =>
  state.comments.editing[commentId] || false;

const getAddingCommentIdsForPost = (state, postId) => {
  const editingComments = new Set(Object.keys(state.comments.editing));
  const commentIdsForPost = new Set(
    getCommentsForPost(state, postId).map(comment => comment.id)
  );
  const addingIds = new Set(
    [...editingComments].filter(id => !commentIdsForPost.has(id))
  );

  return addingIds;
};

export const isAddingNewComment = (state, postId) =>
  getAddingCommentIdsForPost(state, postId).size > 0;
export const getNewCommentId = (state, postId) =>
  getAddingCommentIdsForPost(state, postId)
    .values()
    .next().value;
