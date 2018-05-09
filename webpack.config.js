const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const isProduction = env === 'production';
	const CSSExtract = new MiniCSSExtractPlugin({filename: 'styles.css'});

	console.log('env production', isProduction);
	return {
		entry: './src/app.js',
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js'
		},
		mode: 'production',
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					// isProduction ? MiniCSSExtractPlugin.loader : 'style-loader',
					MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}	
		]
		},
		plugins: [
			CSSExtract
		],
		devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true // for client-side routing
		}
	};
};

