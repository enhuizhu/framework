var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: { path: __dirname + '/', filename: 'Framework.js' },
  plugins: [],
  module: {
    loaders: [
        {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }
    ]
 }
};
