var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './src/main/js/client/main.js',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
