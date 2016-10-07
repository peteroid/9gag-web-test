var React = require('react')
var ReactRedux = require('react-redux')

var PostsActions = require('../actions/posts')
var PostList = require('../components/PostList')

const mapStateToProps = state => {
  return state.postsState
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: _ => {
      
    },

    fetchPost: (offset) => {
      dispatch(PostsActions.fetchPosts(offset))
    }
  }
}

var PostListContainer = React.createClass({
  componentDidMount() {
    console.log('PostListContainer mount')
    window.addEventListener('scroll', this.onScrollHandler)
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight

    this._height = height
    console.log(height)

    this.props.fetchPost(this.props.offset)
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandler)
  },

  onScrollHandler() {
    var rect = this._d && this._d.getBoundingClientRect()
    if (this.props.hasNext && rect && rect.bottom < this._height) {
      this.props.fetchPost(this.props.offset)
    }
  },

  render() {
    return (
      <div ref={d => this._d = d}>
        <PostList
          {...this.props} />
      </div>
    )
  }
})

module.exports = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListContainer)