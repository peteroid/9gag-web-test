var ReactRedux = require('react-redux')
var PostsActions = require('../actions/posts')

var PostList = require('../components/PostList')

const mapStateToProps = state => {
  return {
    posts: state.postsState.posts
  }
}

const mapDispatchToProps = (dispatch, props) => {
  console.log("dispatc for", props)
  return {
    onClick: _ => {
      dispatch(PostsActions.addPosts({b:2}))
    }
  }
}

const PostListContainer = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)

module.exports = PostListContainer