var Post = require('../models/post')

module.exports.getPosts = function (req, res) {
  var offset = parseInt(req.query.offset, 0)
  var key = req.query.sortKey || 'date'
  Post.query(key, offset, 10)
    .then(posts => {
      console.log(posts.length)
      res.send(posts)
    })
    .catch(err => {
      console.log(err)
    })
}

