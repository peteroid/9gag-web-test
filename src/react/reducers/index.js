var Redux = require('redux')
var postsReducer = require('./posts')

module.exports = Redux.combineReducers({
  postsState: postsReducer
})