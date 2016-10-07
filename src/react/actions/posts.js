require('es6-promise').polyfill()
require('isomorphic-fetch')

module.exports = {
  GET_POSTS: 'GET_POSTS',
  ADD_POSTS: 'ADD_POSTS',
  REQUEST_POSTS: 'REQUEST_POSTS',
  SET_SORT_KEY: 'SET_SORT_KEY',

  getPosts: function (offset) {
    return {
      type: this.GET_POSTS,
      offset: offset
    }
  },

  setSortKey: function (key) {
    return {
      type: this.SET_SORT_KEY,
      sortKey: key
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

  fetchPosts: function (offset, key) {
    console.log(offset)
    var _this = this
    return dispatch => {
      dispatch(_this.requestPosts())
      return fetch('/api/posts?offset=' + (offset || 0) + (key ? ('&sortKey=' + key) : ''))
        .then(response => {
          return response.json()
        }).then(json => {
          dispatch(_this.addPosts(json))
        })
    }
  }
}