const webpack = require('webpack')
const { resolve } = require('path')
const appConfig = require('../app.config')

module.exports = {
	appEntry: [
		'react-hot-loader/patch',
		// activate HMR for React
		`webpack-dev-server/client?${appConfig.webServer.url}`,
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint
		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates
		resolve(__dirname, '../src/app/index.js')
		// the actuall entry file path has to be at the end of the array
		// the order is critical
	],
	devtool: 'source-map',
	outputFilename: '[name].js',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally
		new webpack.NamedModulesPlugin()
		// prints more readable module names in the browser console on HMR updates
		// To generate identifiers that are preserved over builds, webpack supplies the HashedModuleIdsPlugin for production
	]
}
