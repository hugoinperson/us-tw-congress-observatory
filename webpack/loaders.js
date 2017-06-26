const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [
	{
		test: /\.(js|jsx)$/,
		use: [
			'babel-loader'
		],
		exclude: /node_modules/
	},
	{
		test: /\.(graphql|gql)$/,
		loader: 'graphql-tag/loader',
		exclude: /node_modules/
	},
	{
		test: /\.eot(\?v=\d+.\d+.\d+)?$/,
		use: [
			{
				loader: 'file-loader',
				options: {
					name: 'assets/[hash].[ext]'
				}
			}
		]
	},
	{
		test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 1000,
					mimetype: 'application/octet-stream',
					name: 'assets/[hash].[ext]'
				}
			}
		]
	},
	{
		test: /\.(jpe?g|png|gif)$/i,
		use: [
			{
				loader: 'url-loader',
				options: {
					name: 'assets/[name].[ext]'
				}
			}
		]
	},
	{
		test: /\.(svg|woff|woff2)$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: 'assets/[hash].[ext]'
				}
			}
		]
	},
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'postcss-loader']
		})
	}
]
