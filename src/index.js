/* eslint-disable no-console */

import { resolve } from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackConfig from '../webpack/webpack.config'
import appConfig from '../app.config'
import { chalkInfo } from './utils/chalkConfig'

let reactServer

function startHotReloadServer () {
	const WebpackDevServer = require('webpack-dev-server')

	reactServer = new WebpackDevServer(webpack(webpackConfig), {
		hot: true,
		// enable HMR on the server
		contentBase: resolve(__dirname, 'dist'),
		// match the output path
		publicPath: '/',
		// match the output `publicPath`
		stats: {
			colors: true,
			chunkModules: false,
			children: false
		},
		// console output format, for details: https://webpack.js.org/configuration/stats/
		historyApiFallback: true
		// browser requests will receive the HTML file as normal but API requests will be proxied to the backend server.
	})

	// Serve static resources
	reactServer.use(express.static(resolve(__dirname, '../dist')))

	run()
}

function startServer () {
	reactServer = express()

	// Serve static resources
	reactServer.use(express.static(resolve(__dirname, '../dist')))

	// Always return the main index.html, so react-router render the route in the client
	reactServer.get('*', (req, res) => {
		res.sendFile(resolve(__dirname, '../dist/index.html'))
	})

	run()
}

function run () {
	reactServer.listen(appConfig.webServer.port, () => {
		console.log(chalkInfo(`App is now running on ${appConfig.webServer.url}`))
	})
}

const startServerInEnvironment = {
	local: startHotReloadServer,
	development: startServer,
	staging: startServer,
	production: startServer
}

startServerInEnvironment[process.env.NODE_ENV]()
