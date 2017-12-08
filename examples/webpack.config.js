var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var stylusLoader = require('stylus-loader');
var nib = require('nib');

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'index.jsx'),
    output: {
        path: path.join(__dirname, '../docs'),
        filename: 'bundle.js?[hash]'
    },
    module: {
        rules: [
            // http://survivejs.com/webpack_react/linting_in_webpack/
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loader: 'stylint-loader',
                enforce: 'pre'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader?camelCase&modules&importLoaders=1&localIdentName=[local]---[hash:base64:5]',
                    'stylus-loader'
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new stylusLoader.OptionsPlugin({
            default: {
                // nib - CSS3 extensions for Stylus
                use: [nib()],
                // no need to have a '@import "nib"' in the stylesheet
                import: ['~nib/lib/nib/index.styl']
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../docs/index.html',
            template: 'index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    // https://webpack.github.io/docs/webpack-dev-server.html#additional-configuration-options
    devServer: {
        disableHostCheck: true,
        noInfo: false,
        lazy: false,
        // https://webpack.github.io/docs/node.js-api.html#compiler
        watchOptions: {
            poll: true, // use polling instead of native watchers
            ignored: /node_modules/
        }
    }
};
