var db = require('../db/db.redis.js')

module.exports.getPosts = function (req, res) {
  var offset = parseInt(req.query.offset, 0)
  db.getInstance().lrange('posts', offset, offset + 9, function (err, posts) {
    if (err) {
      console.log(err)
    } else {
      console.log(posts.length)
      res.send(posts)
    }
  })
}

