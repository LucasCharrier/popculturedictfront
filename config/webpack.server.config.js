const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');
const srcPath = path.resolve(process.cwd(), 'src');
 
module.exports = merge(baseConfig, {
  entry: path.join(srcPath, 'server-entry.js'),

  target: 'node',

  devtool: 'source-map',

  output: {
    libraryTarget: 'commonjs2',
  },

  externals: nodeExternals({
    allowlist: /\.css$/,
  }),

  plugins: [new VueSSRServerPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]_[hash:base64:8]',
          },
        },
      },
    ],
  },
});