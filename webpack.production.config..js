/* global __dirname */

var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'js');
var dir_html = path.resolve(__dirname, 'html');
var dir_build = path.resolve(__dirname, 'build');
var dir_dist = path.resolve(__dirname, 'dist');

module.exports = {
    entry: {
        app: path.resolve(dir_js, 'main.js'),
        vendors:['react','react-dom'],
    },
    output: {
        path: dir_dist,
        filename: 'bundle.js'
    },
    /*
    resolve: {
        alias: {
          'react': pathToReact
        }
    },
    */
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_js,
                query: {
                    presets: ['es2015', 'react'],
                },
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};
