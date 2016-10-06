var PostsActions = require('../actions/posts')

var initialState = {
  offset: 0,
  posts: [{a:1}]
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
        posts: state.posts.concat(action.posts)
      })
    default:
      return state
  }
}

module.exports = postsReducer