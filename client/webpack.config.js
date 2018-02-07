const path = require('path');
 
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    upload: './upload/index.js',
    review: './review/index.js'
  },
  output: {
    path: path.join(__dirname, 'build', 'static', 'js'),
    filename: 'bundle-[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
	  path.resolve('./src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
};