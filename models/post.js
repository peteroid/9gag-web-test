var db = require('../db/db.redis.js')

var Post = {
  query: function (key, start, end) {
    return new Promise((resolve, reject) => {
      db.getInstance().sort('post_code_list', 'by', 'h_*->' + key, 'limit', start, end, 'desc', 'get', 'h_*->raw', function (err, posts) {
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