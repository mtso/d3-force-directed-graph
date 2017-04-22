const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlInject = new HtmlWebpackPlugin({
  filename: 'index.html',
  title: 'State Contiguity'
})

module.exports = {
  entry: __dirname + '/app/index.js',
  resolve: { extensions: ['.json', '.js'] },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      }
    ]
  },
  plugins: [ htmlInject ],
}