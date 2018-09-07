const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const generateEntry = require('./generate-entry');
// @ts-ignore
const deps = Object.keys(require('./package.json').dependencies)
generateEntry(deps, path.resolve('./src/index.entry.js'));

module.exports = {
  entry: './src/index.entry.js',
  output: {
    filename: 'index.entry.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },

  stats: 'minimal',
  devServer: {
    stats: 'minimal',
    // contentBase: path.resolve(__dirname, "dist")
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      filename: 'page/one.html',
      inject: false,
      template: './src/page/one.html'
    }),
    new htmlWebpackPlugin({
      filename: 'page/workspace.html',
      inject: false,
      template: './src/page/workspace.html'
    })
  ]
};
