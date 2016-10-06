require('es6-promise').polyfill()
require('isomorphic-fetch')

module.exports = {
  GET_POSTS: 'GET_POSTS',
  ADD_POSTS: 'ADD_POSTS',
  REQUEST_POSTS: 'REQUEST_POSTS',

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
  },

  requestPosts: function () {
    return {
      type: this.REQUEST_POSTS
    }
  },

  fetchPosts: function (offset) {
    console.log(offset)
    var _this = this
    return dispatch => {
      dispatch(_this.requestPosts())
      return fetch('/api/posts?offset=' + (offset || 0))
        .then(response => {
          return response.json()
        }).then(json => {
          dispatch(_this.addPosts(json))
        })
    }
  }
}