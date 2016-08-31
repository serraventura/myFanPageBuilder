var path = require('path');
var webpack = require('webpack');

var clientDir = path.resolve(__dirname, "client");
var distDir = path.resolve(__dirname, "dist");

module.exports = {
    target: "web",
    entry: ["babel-polyfill", "./client"],
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
	resolve: {
       extensions: ["", ".jsx", ".js", ".scss", ".json"]
	},
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            includes: [clientDir],
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }

};