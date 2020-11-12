const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const srcPath = path.resolve(process.cwd(), 'src');
const envConfig = require('./env-loader')({
  // customConfig: {
  //     VUE_ENV: 'client'
  // }
})
const baseConfig = require('./webpack.base.config.js');

const isProduction = process.env.NODE_ENV === 'production';

let config = merge(baseConfig, {
  entry: [path.join(srcPath, 'client-entry.js')],
  plugins: [
    new VueSSRClientPlugin()
  ],
  output: {
    path: path.resolve('./dist/'),
    filename: isProduction ? '[name].[hash:8].js' : '[name].js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   modules: {
            //     localIdentName: '[local]_[hash:base64:8]',
            //   },
            // },
          },
        ],
      },
    ],
  },
});

if (!isProduction) {
  console.log("LCS IS NOT PRODUCRTION")
  config = merge(config, {
    // output: {
    //   filename: '[name].js',
    //   publicPath: 'http://localhost:9999/dist/',
    // },
    plugins: [new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),],
    devtool: 'source-map',
    // devServer: {
    //   writeToDisk: true,
    //   contentBase: path.resolve(__dirname, 'dist'),
    //   publicPath: 'http://localhost:9999/dist/',
    //   hot: true,
    //   inline: true,
    //   historyApiFallback: true,
    //   port: 9999,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // },
  });
} else {
  console.log("LCS IS PRODUCRTION")

  config = merge(config, {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
      }),
    ],
  });
}

module.exports = config;