const path = require('path');
const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');

console.log('port', process.env.PORT);
console.log('client url', process.env.CLIENT_URL);

// todo replace Webpack.DefinePlugin to EnvironmentPlugin
const plugins = [
  new NodemonPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      PORT: JSON.stringify(process.env.PORT),
      CLIENT_URL: JSON.stringify(process.env.CLIENT_URL),
      COOKIE_PROTOCOL: JSON.stringify(process.env.COOKIE_PROTOCOL),
      COOKIE_DOMAIN: JSON.stringify(process.env.COOKIE_DOMAIN),
      BASE_URL: JSON.stringify(process.env.BASE_URL),
      MONGO_URL: JSON.stringify(process.env.MONGO_URL),
      JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
      SESSION_SECRET: JSON.stringify(process.env.SESSION_SECRET),
      FACEBOOK_CLIENT_ID: JSON.stringify(process.env.FACEBOOK_CLIENT_ID),
      FACEBOOK_CLIENT_SECRET: JSON.stringify(
        process.env.FACEBOOK_CLIENT_SECRET
      ),
      FACEBOOK_CALLBACK_URL: JSON.stringify(process.env.FACEBOOK_CALLBACK_URL),
      LINE_LOGIN_CHANNEL_ID: JSON.stringify(process.env.LINE_LOGIN_CHANNEL_ID),
      LINE_LOGIN_CHANNEL_SECRET: JSON.stringify(
        process.env.LINE_LOGIN_CHANNEL_SECRET
      ),
      LINE_LOGIN_CALLBACK_URL: JSON.stringify(
        process.env.LINE_LOGIN_CALLBACK_URL
      ),
      GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
      GOOGLE_CLIENT_SECRET: JSON.stringify(process.env.GOOGLE_CLIENT_SECRET),
      GOOGLE_CALLBACK_URL: JSON.stringify(process.env.GOOGLE_CALLBACK_URL),
    },
  }),
];

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  node: {
    __dirname: false,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins,
};
