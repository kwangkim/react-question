/* global __dirname */
// Get from https://github.com/shanewilson/react-webpack-example/blob/master/webpack.prod.config.js
var path = require('path');
var webpack = require('webpack');
//var minify = require('html-minifier').minify;

var CompressionPlugin = require('compression-webpack-plugin');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'js');
var dir_html = path.resolve(__dirname, 'html');
var dir_build = path.resolve(__dirname, 'build');
var dir_dist = path.resolve(__dirname, 'dist');
var jsname='MA010-Final-Review-';
var hashnumber='15121002030';
module.exports = {
    entry: path.resolve(dir_js, '10.js'),
    output: {
        path: dir_dist,
        filename: jsname+'bundle-'+hashnumber+'.min.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                query: {
                    presets: ['es2015', 'react','stage-0'],
                },
            },
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                    except: ['$super', '$', 'exports', 'require']
            },
            compress:{
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output:{
                comments: false
            }
        }), 
        new CompressionPlugin({
            asset: '{file}.gz',
            algorithm: 'gzip',
            regExp: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ]),
    ],
    stats: {
        // Nice colored output
        colors: true
    },
};
