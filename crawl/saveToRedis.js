var fs = require('fs')
var redis = require('redis')

const redisServerConf = {
  host: '127.0.0.1',
  port: '6379'
}

var getPostsFromFile = function (fileName) {
  return JSON.parse(fs.readFileSync(__dirname + fileName, 'utf8'))
}

var savePostsToRedis = function (posts) {
  var postsString = posts.map(_ => {return JSON.stringify(_)})
  console.log(postsString.length)

  var postCodeList = posts.map(_ => {return _.code})
  console.log(postCodeList.slice(0, 5))

  var postHashes = {}
  var postHashList = posts.map(p => {
    let h = {
      comments_count: p.comments.count,
      likes_count: p.likes.count,
      date: p.date,
      raw: JSON.stringify(p)
    }

    postHashes[p.code] = h
    return h
  })

  // console.log(postHashList.slice(0, 5))
  // for (var k in postHashes) {
  //   let v = postHashes[k]
  //   console.log(k, v)
  // }
  // return

  redisClient.rpush(['post_code_list'].concat(postCodeList), (err, reply) => {
    if (err) {
      console.log(err)
    } else {
      console.log('post code list saved')
      for (var k in postHashes) {
        let v = postHashes[k]
        console.log('saving: %s -> %s', k, v)
        redisClient.hmset('h_' + k, v)
      }
    }
  })

  // redisClient.exists('posts', function (err, exists) {
  //   if (err) {
  //     console.log(err)
  //   } else if (exists) {
  //     console.log('posts exist. del the old posts')
  //     redisClient.del('posts', (err, reply) => {
  //       if (err) {
  //         console.log(err)
  //       } else {
  //         console.log('save now')
  //         redisClient.rpush(['posts'].concat(postsString))
  //       }
  //     })
  //   } else {
  //     console.log('posts not exist. save now')
  //     redisClient.rpush(['posts'].concat(postsString))
  //   }
  // })
}

var posts = getPostsFromFile('/posts.txt')
var redisClient = redis.createClient(redisServerConf.port, redisServerConf.host)
redisClient.on('connect', function () {
  console.log('Redis connected')
  savePostsToRedis(posts)
})

module.exports = {
  posts: posts
}