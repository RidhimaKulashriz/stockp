console.log("1: Setting env...");
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

console.log("2: Requiring webpack...");
const webpack = require('webpack');

console.log("3: Requiring webpack-dev-server...");
const WebpackDevServer = require('webpack-dev-server');

console.log("4: Requiring webpack config...");
const configFactory = require('react-scripts/config/webpack.config');

console.log("5: Requiring dev server config...");
const createDevServerConfig = require('react-scripts/config/webpackDevServer.config');

console.log("6: Creating config...");
const config = configFactory('development');

console.log("7: Creating compiler...");
const compiler = webpack(config);

console.log("8: Creating dev server config...");
const serverConfig = createDevServerConfig(undefined, 'localhost');

serverConfig.host = 'localhost';
serverConfig.port = 3011;

console.log("9: Creating WebpackDevServer instance...");
const devServer = new WebpackDevServer(serverConfig, compiler);

console.log("10: Starting dev server...");
devServer.startCallback(() => {
  console.log("Dashboard dev server started on http://localhost:3011");
});
