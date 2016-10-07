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

    fetchPost: (offset, key) => {
      dispatch(PostsActions.fetchPosts(offset, key))
    }
  }
}

var PostListContainer = React.createClass({
  contextTypes: {
    store: React.PropTypes.object.isRequired
  },
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

    this.props.fetchPost(this.props.offset, this.props.sortKey)
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandler)
  },

  onScrollHandler() {
    var rect = this._d && this._d.getBoundingClientRect()
    if (this.props.hasNext && rect && !this.props.isFetching && (rect.bottom < this._height + 500)) {
      this.props.fetchPost(this.props.offset, this.props.sortKey)
    }
  },

  render() {
    return (
      <div ref={d => this._d = d} className="container">
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