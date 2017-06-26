const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV

module.exports = {
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV']),
		// define the environment variables and make it accessible to client-side files

		new HtmlWebpackPlugin({
			title: 'US-Taiwan Congress Observatory',
			template: resolve(__dirname, '../src/app/index.ejs'),
			favicon: resolve(__dirname, '../src/assets/images/favicon.png'),
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[chunkhash].js',
			minChunks: function (module) {
				// this assumes your vendor imports exist in the node_modules directory
				return module.context && module.context.indexOf('node_modules') !== -1
			}
		}),
		// implicit common vendor chunk

		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			filename: (() => {
				let filename = {local: 'manifest.js', development: 'manifest.[hash].js', staging: 'manifest.[hash].js', production: 'manifest.[chunkhash].js'}
				return filename[env]
			})(),
			minChunks: Infinity
		}),
		// implicit common manifest chunk
		// CommonChunksPlugin will now extract all the common modules from "vendor"" and "app"" bundles
		// But since there are no more common modules between them we end up with just the runtime code included in the manifest file

		new ExtractTextPlugin('[name].[contenthash].css')
		// https://github.com/webpack-contrib/extract-text-webpack-plugin
		// It moves all the required *.css modules in entry chunks into a separate CSS file.
		// So your styles are no longer inlined into the JS bundle, but in a separate CSS file (styles.css).
		// If your total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle.
	]
}
