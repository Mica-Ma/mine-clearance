const webpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = Object.assign(webpackConfig, {
  mode: 'development',
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[id].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    })
  ]
})