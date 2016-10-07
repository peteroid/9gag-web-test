var PostsActions = require('../actions/posts')

var initialState = {
  offset: 0,
  posts: [],
  hasNext: true,
  isFetching: false,
  sortKey: 'date'
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
        hasNext: action.posts.length != 0,
        isFetching: false
      })
    case PostsActions.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PostsActions.SET_SORT_KEY:
      return Object.assign({}, state, {
        sortKey: action.sortKey,
        offset: 0,
        posts: []
      })
    default:
      return state
  }
}

module.exports = postsReducer