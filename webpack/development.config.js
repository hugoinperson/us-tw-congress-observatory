const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
	appEntry: [
		resolve(__dirname, '../src/app/index.js')
		// the actuall entry file path has to be at the end of the array
		// the order is critical
	],
	devtool: 'source-map',
	outputFilename: '[name].[chunkhash].js',
	plugins: [
		new webpack.NamedModulesPlugin()
		// prints more readable module names in the browser console on HMR updates
		// To generate identifiers that are preserved over builds, webpack supplies the HashedModuleIdsPlugin for production
	]
}
