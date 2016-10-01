var path = require('path');
var webpack = require('webpack');

var clientDir = path.resolve(__dirname, "client");
var distDir = path.resolve(__dirname, "dist");

module.exports = {
    target: "web",
    entry: ["babel-polyfill", "./client"],
    // devtool: 'source-map',
	output: {
		filename: "client.js",
		publicPath: '/dist',
		path: distDir,
		//This corrects the map files to be relative to the distrubution
		devtoolModuleFilenameTemplate: function (info) {
			// console.log('info.absoluteResourcePath: ',info.absoluteResourcePath)
			return path.relative(distDir, info.absoluteResourcePath);
		}
	},
	// plugins: [
    //     new webpack.ProvidePlugin({
    //         'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    //     })
	// ],
	resolve: {
       extensions: ["", ".jsx", ".js", ".scss", ".json"]
	},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                includes: [clientDir],
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'less']
            },
            { 
                test: /\.(woff|woff2|eot|ttf|otf)$/, 
                loader: 'file-loader?limit=100000', 
                exclude: /node_modules/ 
            },
            {
                test: /\.(png|jpg|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader'
            }
        ]
    }

};