const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk')
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.conf');

const ip = require('ip');
const IP = ip.address();


const serverConfig = {
  host: '0.0.0.0',
  port: '8000'
};

const links = ['localhost', IP].map(val => `http://${val}:${serverConfig.port}`)

const options = {
  // contentBase: path.resolve(__dirname, '../dist'),
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  stats: "errors-only",
  ...serverConfig
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);

const compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler, options);

server.listen(serverConfig.port, serverConfig.host, err => {
  if (err) {
    return console.log(err);
  }

  console.log();
  console.log(`App running at:`);
  links.forEach(val => {
    console.log(`Starting server on ${chalk.cyan(val)}`);
  })
  console.log();
});