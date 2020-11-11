// config/webpack.base.config.js    
const path = require('path');
const srcPath = path.resolve(process.cwd(), 'src');
const isProduction = process.env.NODE_ENV === 'production';
 
module.exports = {
    mode: process.env.NODE_ENV,
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            'assets': path.resolve(__dirname, '../src/assets'),
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['.ts', '.tsx', '.js']
    },
   module: {
       rules: [
           {
               test: /\.vue$/,
               loader: 'vue-loader',
               include: [ srcPath ],
           },
           {
               test: /\.js$/,
               loader: 'babel-loader',
               include: [ srcPath ],
               exclude: /node_modules/,
           },         
           {
               test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
               use: [
                   {
                       loader: 'url-loader',
                       options: {
                           limit: 10000,
                           name: '[path][name].[hash:7].[ext]',
                           context: srcPath
                       }
                   }
               ]
           },
           {
               test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
               use: [
                   {
                       loader: 'url-loader',
                       options: {
                           limit: 10000,
                           name: '[name].[hash:7].[ext]'
                       }
                   }
               ]
           },
       ]
   }
};
