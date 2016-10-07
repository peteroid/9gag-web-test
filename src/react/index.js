var React = require('react')
var Redux = require('redux')
var Provider = require('react-redux').Provider
var ReactDom = require('react-dom')
var Thunk = require('redux-thunk').default

var store = Redux.createStore(
  require('./reducers'),
  Redux.applyMiddleware(Thunk))

var PostListContainer = require('./containers/PostListContainer')
var ControllerContainer = require('./containers/ControllerContainer')

function App(props) {
  return (
    <div>
      <nav className="header">
        <img className="header-img"
          src="//scontent-sit4-1.cdninstagram.com/t51.2885-19/s320x320/12558510_934902113224871_1348837979_a.jpg" />
        <h1 className="header-content">
          9Gag
        </h1>
      </nav>
      <ControllerContainer />
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