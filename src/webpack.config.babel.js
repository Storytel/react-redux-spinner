const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = [
  {
    name: 'react-redux-spinner',
    entry: [
      './src/nprogress.css',
      './src/index.js'
    ],
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'prop-types': 'prop-types'
    },
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: 'react-redux-spinner.js',
      library: 'react-redux-spinner',
      libraryTarget: 'umd',
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [ __dirname ],
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          })
        }
      ]
    },
    plugins: [
      new UglifyJSPlugin(),
      new ExtractTextPlugin('react-redux-spinner.css')
    ]
  }
];

module.exports = config;
