var PostsActions = require('../actions/posts')

var initialState = {
  offset: 0,
  posts: {},
  postCodes: [],
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
      var newState = Object.assign({}, state, {
        offset: state.offset + action.posts.length,
        hasNext: action.posts.length != 0,
        isFetching: false
      })

      action.posts.forEach(p => {
        newState.postCodes.push(p.code)
        newState.posts[p.code] = p
      })
      
      return newState
    case PostsActions.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PostsActions.SET_SORT_KEY:
      return Object.assign({}, state, {
        sortKey: action.sortKey,
        offset: 0,
        postCodes: []
      })
    case PostsActions.SET_VIDEO_URL:
      var newState = Object.assign({}, state)
      newState.posts[action.code].video_url = action.url
      return newState
    default:
      return state
  }
}

module.exports = postsReducer