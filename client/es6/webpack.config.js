const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname + '/../../resources/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname),
            exclude: /(node_modules)|(tests)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','es2017']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};