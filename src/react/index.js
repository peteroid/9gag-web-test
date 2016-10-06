var React = require('react')
var Redux = require('redux')
var Provider = require('react-redux').Provider
var ReactDom = require('react-dom')

var store = Redux.createStore(require('./reducers'))

function App(props) {
  return (
    <div>
      <h1 onClick={_ => {console.log(store.getState())}}>Hello to 9GAG !!!</h1>
    </div>
  )
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)