var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		hot: true
	},
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'babel-polyfill',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new NpmInstallPlugin()
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			}
		],
		loaders: [
			{
				loader: 'react-hot-loader/webpack',
				include: [
					path.resolve(__dirname, 'src')
				],
				test: /\.js$/
			},
			{
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'src')
				],
				test: /\.js$/,
				options: {
					plugins: ['transform-runtime']
				}
			}
		]
	}
}