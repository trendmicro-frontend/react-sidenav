var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var findImports = require('find-imports');
var stylusLoader = require('stylus-loader');
var nib = require('nib');
var publicname = pkg.name.replace(/^@\w+\//, ''); // Strip out "@trendmicro/" from package name
var banner = [
    publicname + ' v' + pkg.version,
    '(c) ' + new Date().getFullYear() + ' Trend Micro Inc.',
    pkg.license,
    pkg.homepage
].join(' | ');
var localClassPrefix = publicname.replace(/^react-/, ''); // Strip out "react-" from publicname

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    externals: []
        .concat(findImports(['src/**/*.{js,jsx}'], { flatten: true }))
        .concat(Object.keys(pkg.peerDependencies))
        .concat(Object.keys(pkg.dependencies)),
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?camelCase&modules&importLoaders=1&localIdentName=' + localClassPrefix + '---[local]---[hash:base64:5]!stylus-loader'
                })
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new stylusLoader.OptionsPlugin({
            default: {
                // nib - CSS3 extensions for Stylus
                use: [nib()],
                // no need to have a '@import "nib"' in the stylesheet
                import: ['~nib/lib/nib/index.styl']
            }
        }),
        new ExtractTextPlugin('../dist/' + publicname + '.css'),
        new webpack.BannerPlugin(banner)
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
};
