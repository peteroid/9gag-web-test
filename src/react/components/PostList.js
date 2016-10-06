var React = require('react')
var PropTypes = React.PropTypes

function PostList(props) {
  return (
    <ul onClick={props.onClick}>
      {
        props.posts.map((post, index) => {
          return (
            <li key={index}>
              <p>{post.caption || JSON.stringify(post)}</p>
              <img src={post.thumbnail_src} />
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