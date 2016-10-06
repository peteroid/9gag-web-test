var webpack = require('webpack')

var config = {
  module: {
    loaders : [
      {
        test : /\.js?/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      }
    ]
  },
  entry: __dirname + '/src/react/index.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'app.js'
  }
};

module.exports = config