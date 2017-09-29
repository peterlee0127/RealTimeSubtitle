let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: './app/req.js',
    output: {
        filename: 'bundle.js',
          path: path.resolve(__dirname, './public/dist')
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }
        ]
    },
    node: {
        fs: 'empty'
    }
};
