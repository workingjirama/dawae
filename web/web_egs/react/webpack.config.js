const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './public');

const config = {
    entry: APP_DIR + '/index.js',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'emotion'],
            }
        }]
    },
    node: {
        fs: "empty"
    },
    output: {
        path: BUILD_DIR,
        filename: 'app.min.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        })
    ]
};

module.exports = config;
