const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (env, argv) => {
  const { mode = 'production' } = argv;
  const devMode = mode === 'development';

  return {
    name: 'react-redux-spinner-example',
    entry: [
      './example/index.js'
    ],
    output: {
      path: path.join(__dirname, '..', 'dist-example'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [ __dirname, path.join(__dirname, '..', 'src/') ],
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode) }),
      new HtmlWebpackPlugin({ inject: 'head', title: 'React Redux Spinner' })
    ],
    devtool: devMode ? 'cheap-module-source-map' : ''
  };
};
