var React = require('react')
var PropTypes = React.PropTypes

function PostList(props) {
  return (
    <ul onClick={props.onClick}>
      {
        props.posts.map((post, index) => {
          return (
            <li key={index}>
              <p>{post.caption}</p>
              <a target="_blank" href={'//www.instagram.com/p/' + post.code}>
                <img src={post.thumbnail_src} />
              </a>
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