var PostsActions = require('../actions/posts')

var initialState = {
  offset: 0,
  posts: [],
  hasNext: true
};

function postsReducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case PostsActions.GET_POSTS:
      return Object.assign({}, state, {
        offset: action.offset
      })
    case PostsActions.ADD_POSTS:
      return Object.assign({}, state, {
        offset: state.offset + action.posts.length,
        posts: state.posts.concat(action.posts),
        hasNext: action.posts.length != 0
      })
    default:
      return state
  }
}

module.exports = postsReducer