'use strict';

var path = require('path');

var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function envVars() {
  let vars = [
    'REACT_APP_API_KEY',
    'REACT_APP_APP_ID',
    'REACT_APP_AUTH_DOMAIN',
    'REACT_APP_PROJECT_ID',
    'REACT_APP_STORAGE_BUCKET',
    'REACT_APP_DB_URL',
    'REACT_APP_SENDER_ID',
    'REACT_APP_MEASUREMENT_ID'
  ]

  return vars.reduce((obj, v) => {
    const keyname = `process.env.${v}`
    return {
      ...obj,
      [keyname]: JSON.stringify(process.env[v])
    }
  }, {})
}

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname),
  mode: 'production',
  entry: {
    vendor: [
      '@babel/polyfill'
    ],
    main: [
      path.join(__dirname, 'src/client/main.tsx')
    ],
  },
  output: {
    path: path.join(__dirname, 'src/assets/public/js'),
    filename: '[name].js',
    publicPath: '/src/assets/public/'
  },
  plugins:[
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin({
      // Maximum for CircleCI Free
      workers: 2,
      tsconfig: path.join(__dirname, 'src/client/tsconfig.json')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      ...envVars()
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~': path.join(__dirname, '/src/client'),
      '@Shared': path.join(__dirname, '/src/shared')
    }
  },
  module: {
    rules: [{
      test: /\.(j|t)s?(x)?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};