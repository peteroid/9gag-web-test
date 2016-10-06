var React = require('react')
var Redux = require('redux')
var Provider = require('react-redux').Provider
var ReactDom = require('react-dom')
var Thunk = require('redux-thunk').default

var store = Redux.createStore(
  require('./reducers'),
  Redux.applyMiddleware(Thunk))

var PostListContainer = require('./containers/PostListContainer')

function App(props) {
  return (
    <div>
      <h1 onClick={_ => {console.log(store.getState())}}>Hello to 9GAG !!!</h1>
      <PostListContainer />
    </div>
  )
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)