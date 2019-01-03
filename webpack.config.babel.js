const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
  const { mode = 'production' } = argv;

  return {
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
      path: path.join(__dirname, 'dist'),
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
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'react-redux-spinner.css'
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin(),
      ]
    }
  }
};
