const path = require('path');

const isProd = () => process.env.NODE_ENV === 'production';
const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    index: resolve('src/mian.ts'),
    vendor: ['jquery']
  },

  output: {
    path: resolve('dist'),
    filename: '[name][hash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      // {
      //   test: /\.(js|ts)$/,
      //   loader: "eslint-loader",
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('example')]
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolve('src')
    }
  }
    
};
