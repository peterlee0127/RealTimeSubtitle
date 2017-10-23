let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: { app: [
    './app/navBar.js',
    './app/switchButton.js', 
    './app/main.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/'
    },
    devServer: {
        inline: false,
        contentBase: "./public/dist",
    },
    module: {
        rules: [
        {
              test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                //presets: ['es2017', 'react']
              }
        },
        {
            test: /(\.md|\.map)$/,
            loader: 'null-loader'
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
         {
        test: /\.(jpe?g|png|gif)$/i,
        loader:"file-loader",
            query:{
                name:'[name].[ext]',
                outputPath:'images/'
            }
        },
        {
            test: /\.css$/,
            loaders: ["style-loader","css-loader"]
        }
        ]
    },
    node: {
        fs: 'empty',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
      new webpack.ProvidePlugin({
          'window.jQuery'    : 'jquery',
          'window.$'         : 'jquery',
          'jQuery'           : 'jquery',
          '$'                : 'jquery'
      })
    ],
    devtool: 'source-map'
};
