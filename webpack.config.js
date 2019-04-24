var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: `${__dirname}/build`
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
};
