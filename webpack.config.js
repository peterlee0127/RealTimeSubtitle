let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {app: path.resolve(__dirname, './app/req.js')
    },
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
        },
        {
            test: /(\.md|\.map)$/,
            loader: 'null-loader'
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'} )
    ]

};
