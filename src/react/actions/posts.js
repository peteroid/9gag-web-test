module.exports = {
  GET_POSTS: 'GET_POSTS',
  ADD_POSTS: 'ADD_POSTS',

  getPosts: function (offset) {
    return {
      type: this.GET_POSTS,
      offset: offset
    }
  },

  addPosts: function (posts) {
    return {
      type: this.ADD_POSTS,
      posts: posts
    }
  }
}