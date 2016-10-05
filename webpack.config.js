var webpack = require('webpack')

var config = {
  module: {
    loaders : [
      {
        test : /\.js?/,
        exclude: /node_modules/,
        loader : 'babel'
      }
    ]
  },
  entry: './src/react/index.js',
  output: {
    path: './public/javascripts',
    filename: 'app.js'
  }
};

module.exports = config