var db = require('../db/db.redis.js')

var Post = {
  range: function (start, end) {
    return new Promise((resolve, reject) => {
      db.getInstance().lrange('posts', start, end, function (err, posts) {
        if (err) {
          reject(err)
        } else {
          resolve(posts.map(_ => {return JSON.parse(_)}))
        }
      })
    })
  }
}

module.exports = Post