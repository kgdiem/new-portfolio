const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname + '/../resources/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname),
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};