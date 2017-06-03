const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function () {
  return {

    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: extractTextPlugin.extract({
            use: 'css-loader'
          })
        }
      ],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new extractTextPlugin('styles/style.css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  }
};