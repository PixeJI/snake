const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const production = require('./webpack/production');
const webpack = require('webpack');

const PATH = {
  build: path.join(__dirname, 'public/build'),
  source: path.join(__dirname, 'src')
};
const common = merge([
      {
        entry: PATH.source + '/index.js',
        output: {
          path: PATH.build,
          filename: '[name].js',
          publicPath: '/build/'
        },
        module: {
          rules: [
            {
              test: /\.js?$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                }
              ]
            },

          ]
        },
        plugins: [
          new htmlWebpackPlugin({
            title: 'Snake'
          })
        ]
      }
    ]
);

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      production()
    ])
  }
  if (env === 'development') {
    return merge([
      common,
      devserver()
    ])
  }
};

