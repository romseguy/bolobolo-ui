const {
  override,
  addBabelPlugins,
  // addBabelPresets,
  addWebpackAlias,
  disableEsLint
} = require('customize-cra')
const rewireGqlTag = require('react-app-rewire-graphql-tag')
const path = require('path')

module.exports = function ov(config, env) {
  config = rewireGqlTag(config, env)
  config = override(
    disableEsLint(),
    // ...addBabelPresets(['@babel/preset-stage-1']),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    ...addBabelPlugins(
      '@babel/plugin-proposal-export-default-from'
      // 'import-graphql'
    )
  )(config, env)

  return config
}
