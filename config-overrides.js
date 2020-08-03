const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = function(config, env) {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    '@components': resolve('src/components'),
    '@pages': resolve('src/pages'),
    '@configs': resolve('src/configs'),
    '@reducers': resolve('src/reducers'),
    '@saga': resolve('src/saga'),
    '@utils': resolve('src/utils'),
    '@constants': resolve('src/constants'),
    '@actions': resolve('src/actions')
  });

  return config;
}