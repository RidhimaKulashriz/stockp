process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('react-scripts/config/webpack.config');
const createDevServerConfig = require('react-scripts/config/webpackDevServer.config');

const config = configFactory('development');
const compiler = webpack(config);
const serverConfig = createDevServerConfig(undefined, 'localhost');

serverConfig.host = 'localhost';
serverConfig.port = 3011;

const devServer = new WebpackDevServer(serverConfig, compiler);

console.log("Starting Webpack Dev Server on port 3011 directly...");
devServer.startCallback(() => {
  console.log("Dashboard dev server started on http://localhost:3011");
});
