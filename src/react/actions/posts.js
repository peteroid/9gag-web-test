require('es6-promise').polyfill()
require('isomorphic-fetch')

module.exports = {
  GET_POSTS: 'GET_POSTS',
  ADD_POSTS: 'ADD_POSTS',
  REQUEST_POSTS: 'REQUEST_POSTS',
  SET_SORT_KEY: 'SET_SORT_KEY',
  SET_VIDEO_URL: 'SET_VIDEO_URL',

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

  setVideoUrl: function (code, url) {
    return {
      code: code,
      url: url,
      type: this.SET_VIDEO_URL
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
  },

  fetchVideoUrl: function (code) {
    var _this = this
    return dispatch => {
      return fetch('https://www.instagram.com/p/' + code + '/?__a=1')
        .then(response => {
          return response.json()
        }).then(json => {
          dispatch(_this.setVideoUrl(code, json.media.video_url))
        })
    }
  }
}