const path = require("path");
const { override, addWebpackAlias, useBabelRc, useEslintRc } = require('customize-cra')

const resolve = dir => path.resolve(__dirname, dir);
const alias = {
  '@components': resolve('src/components'),
  '@pages': resolve('src/pages'),
  '@configs': resolve('src/configs'),
  '@reducers': resolve('src/reducers'),
  '@saga': resolve('src/saga'),
  '@utils': resolve('src/utils'),
  '@constants': resolve('src/constants'),
  '@actions': resolve('src/actions'),
  '@assets': resolve('src/assets')
}
module.exports = override(
  addWebpackAlias(alias),
  useBabelRc(),
  useEslintRc(path.resolve(__dirname, '.eslintrc'))
)