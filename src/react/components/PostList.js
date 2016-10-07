var React = require('react')
var PropTypes = React.PropTypes

function PostList(props) {
  return (
    <ul onClick={props.onClick} className="post-list row">
      {
        props.posts.map((post, index) => {
          return (
            <li key={index} className="post-list-item col-sm-6 col-md-4 col-sm-12">
              <a target="_blank" href={'//www.instagram.com/p/' + post.code}>
                {
                  post.is_video && post.video_url ? (
                    <video src={post.video_url} />
                  ) : (
                    <img src={post.thumbnail_src} className="img-responsive" />
                  )
                }
              </a>
              <p>{post.caption}</p>
              <p>
                {post.likes.count}<br />
                {post.comments.count}<br />
              </p>
            </li>
          )
        })
      }
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
}

module.exports = PostList