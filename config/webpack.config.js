const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: ['babel-polyfill', './src/index.jsx'],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js'
  },
  performance: {
    hints: 'warning'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
}

module.exports = config
