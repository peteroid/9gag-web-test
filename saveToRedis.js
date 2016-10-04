var fs = require('fs')
var redis = require('redis')

const redisServerConf = {
  host: '127.0.0.1',
  port: '6379'
}

var redisClient = redis.createClient(redisServerConf.port, redisServerConf.host)

redisClient.on('connect', function () {
  console.log('Redis connected')
  var posts = getPostsFromFile('/posts.txt')
  savePostsToRedis(posts)
})

var getPostsFromFile = function (fileName) {
  return JSON.parse(fs.readFileSync(__dirname + fileName, 'utf8'))
}

var savePostsToRedis = function (posts) {
  var postsString = posts.map(_ => {return JSON.stringify(_)})
  console.log(postsString.length)
  // return
  redisClient.exists('posts', function (err, exists) {
    if (err) {
      console.log(err)
    } else if (exists) {
      console.log('posts exist. del the old posts')
      redisClient.del('posts', (err, reply) => {
        if (err) {
          console.log(err)
        } else {
          console.log('save now')
          redisClient.rpush(['posts'].concat(postsString))
        }
      })
    } else {
      console.log('posts not exist. save now')
      redisClient.rpush(['posts'].concat(postsString))
    }
  })
}

module.exports = {
  posts: getPostsFromFile('/posts.txt')
}