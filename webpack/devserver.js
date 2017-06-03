const webpack = require('webpack');
module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    devServer: {
      stats: 'errors-only',
      hot: true,
      host: '0.0.0.0',
      port: '3000',
      historyApiFallback: true,
      contentBase: 'public',
    }
  }
};