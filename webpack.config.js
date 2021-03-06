/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});

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
        [keyname]: JSON.stringify(dotenv.parsed[v])
      }
    }, {})
}

module.exports = {
  cache: true,
  devtool: '#eval-source-map',
  context: path.join(__dirname),
  mode: 'development',
  entry: {
    vendor: [
      '@babel/polyfill'
    ],
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?timeout=2000&path=/__webpack_hmr',
      path.join(__dirname, 'src/client/main.tsx')
    ]
  },
  output: {
    path: path.join(__dirname, 'src/assets/public/js'),
    filename: '[name].js',
    publicPath: '/js/',
    // hotUpdateChunkFilename: 'hot/hot-update.js',
    // hotUpdateMainFilename: 'hot/hot-update.json'
  },
  watch: true,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
      tsconfig: path.join(__dirname, 'src/client/tsconfig.json')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      ...envVars()
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~': path.join(__dirname, '/src/client'),
      '@Shared': path.join(__dirname, '/src/shared'),
      'react-dom': '@hot-loader/react-dom',
    }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
        },
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  }
};