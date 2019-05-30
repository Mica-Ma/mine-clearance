const webpackConfig = require('./webpack.prod.conf');
const Webpack = require('webpack');
const rm = require('rimraf');
const ora = require('ora');
const path = require('path')

const spinner = ora('building for ' + process.env.env_config + ' environment...')
spinner.start();
rm(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err
  Webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  
    console.log('----- build complete >_<#@! -----');
  });
})