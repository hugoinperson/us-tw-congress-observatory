/*!
 * There are 4 different environments:
 * (1) local: 			This environment enable module hot reload and other local development related features.
 * 									There's no build required for this environment. Webpack bundles are served from memory.
 * 									[ Use webpack-dev-server to serve the app ]
 *
 * (2) development: This environment requires running a build script before starting the app. However, this
 * 									build won't minimize and uglify any code. Also, redux-logger will still be enabled for
 * 									generating helpful console logs.
 * 									[ Use normal express to serve the app ]
 *
 * (3) staging: 		This is a pre-`roduction environment. The build script will minimize and uglify the code,
 * 									and nosources-source-map will be used to hide the sour`e content. From this environment
 * 									and above, stricter eslint rules will be used. The difference between staging and production
 * 									is staging used pre-production data store.
 * 									[ Use normal express to serve the app ]
 *
 * (4) production:  Has the same webpack setting and quality of build files as in staging environment. Use
 * 									production data store.
 * 									[ Use normal express to serve the app ]
 */

const { resolve } = require('path')
const loaders = require('./loaders.js')
const commonConfig = require('./common.config.js')
const envConfig = require(`./${process.env.NODE_ENV}.config.js`)

module.exports = {
	entry: {
		app: envConfig.appEntry,
		vendor: ['react-tooltip']
		// take the common library from react-router code splitting bundles
	},
	target: 'web',
	// this webpack config file is used to create our client-side app
	// if it's needed, we can definitely create another config file for server-side use
	output: {
		filename: envConfig.outputFilename,
		// the output bundle
		// Don’t use [chunkhash] in development since this will increase compilation time.
		// Separate development and production configs and use [name].js for development and [name].[chunkhash].js in production.

		path: resolve(__dirname, '../dist'),
		// physical files are only created by production build task `npm run build`
		// in development environment, webpack will just server the files from memory

		publicPath: '/'
		// necessary for HMR to know where to load the hot update chunks
	},
	devtool: envConfig.devtool,
	module: {
		rules: loaders
	},
	plugins: [...commonConfig.plugins, ...envConfig.plugins]
}
