const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const PATHS = {
	src: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build')
};

const common = {
	entry: PATHS.src,
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: PATHS.src
			},
			{
				test: /\.jsx?$/,
				loaders: ['babel?cacheDirectory'],
				include: PATHS.src
			}
	]
	}
};

if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT || 3030
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin
		]
	});
}

if (TARGET === 'build') {
	module.exports = merge(common, {});
}
