const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './web/src/index.tsx',
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'web'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'web/tsconfig.json',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '..', 'dist', 'web'),
    },
    compress: true,
    port: 3001,
    open: true,
    hot: true,
  },
  mode: 'development',
};
