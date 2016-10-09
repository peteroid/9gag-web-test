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
        
        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
          <div className="btn-group " role="group">
            <button type="button" className={" btn btn-" + (this.props.sortKey == 'date' ? 'success' : 'default')}
              onClick={this.props.setSortKey.bind(null, 'date')}><i className="fa fa-clock-o"></i> Date</button>
            <button type="button" className={" btn btn-" + (this.props.sortKey == 'likes_count' ? 'success' : 'default')}
              onClick={this.props.setSortKey.bind(null, 'likes_count')}><i className="fa fa-heart"></i> Likes</button>
            <button type="button" className={" btn btn-" + (this.props.sortKey == 'comments_count' ? 'success' : 'default')}
              onClick={this.props.setSortKey.bind(null, 'comments_count')}><i className="fa fa-comment"></i> Comments</button>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller)