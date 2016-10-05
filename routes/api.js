var express = require('express');
var router = express.Router();

var postsController = require('../controllers/posts');

router.get('/posts', postsController.getPosts);

module.exports = router;