var Post = require('../models/post')

module.exports.getPosts = function (req, res) {
  var offset = parseInt(req.query.offset, 0)
  Post.range(offset, offset + 9)
    .then(posts => {
      console.log(posts.length)
      res.send(posts)
    })
    .catch(err => {
      console.log(err)
    })
}

