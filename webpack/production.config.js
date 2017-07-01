const webpack = require('webpack')
const { resolve } = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	appEntry: [
		resolve(__dirname, '../src/app/index.js')
		// the actuall entry file path has to be at the end of the array
		// the order is critical
	],
	devtool: 'nosources-source-map',
	outputFilename: '[name].[chunkhash].js',
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true
			},
			output: {
				comments: false
			}
		}),
		new webpack.HashedModuleIdsPlugin()
		// To generate identifiers that are preserved over builds,
		// webpack supplies the NamedModulesPlugin for development
	]
}
