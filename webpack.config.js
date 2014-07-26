var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './src/main/js/client/main.js',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
