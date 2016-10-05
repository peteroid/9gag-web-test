var redis = require('redis');

var db = function () {
  return {
    init: function () {
      this.client = redis.createClient('6379', '127.0.0.1');

      this.client.on('connect', function () {
        console.log('db:redis is up');
      })
    },
    getInstance: function () {
      return this.client;
    }
  }
}();

module.exports = db;