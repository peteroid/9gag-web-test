var React = require('react')
var ReactRedux = require('react-redux')

var PostsActions = require('../actions/posts')

const mapStateToProps = state => {
  return {
    sortKey: state.postsState.sortKey
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setSortKey: (sortKey) => {
      dispatch(PostsActions.setSortKey(sortKey))
      dispatch(PostsActions.fetchPosts(0, sortKey))
    }
  }
}


var Controller = React.createClass({
  render() {
    return (
      <div className="container text-center control-panel">
        <div className="btn-group" role="group">
          <button type="button" className={"btn btn-" + (this.props.sortKey == 'date' ? 'success' : 'default')}
            onClick={this.props.setSortKey.bind(null, 'date')}>Date</button>
          <button type="button" className={"btn btn-" + (this.props.sortKey == 'likes_count' ? 'success' : 'default')}
            onClick={this.props.setSortKey.bind(null, 'likes_count')}>Likes</button>
          <button type="button" className={"btn btn-" + (this.props.sortKey == 'comments_count' ? 'success' : 'default')}
            onClick={this.props.setSortKey.bind(null, 'comments_count')}>Comments</button>
        </div>
      </div>
    )
  }
})

module.exports = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller)