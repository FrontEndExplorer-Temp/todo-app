const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      ...(isProd ? [new MiniCssExtractPlugin({ filename: 'styles.css' })] : []),
    ],
    optimization: {
      minimize: isProd,
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      static: './dist',
      hot: true,
      open: true,
      port: 3000,
    },
    resolve: {
      extensions: ['.js'],
    },
  };
};
