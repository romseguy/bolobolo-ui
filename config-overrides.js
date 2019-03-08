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
  config = rewireGqlTag(config, env) // import .graphql files
  config = override(
    disableEsLint(),
    // ...addBabelPresets(['@babel/preset-stage-1']),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    ...addBabelPlugins(
      '@babel/plugin-proposal-export-default-from',
      'react-hot-loader/babel',
      'transform-semantic-ui-react-imports',
      'ramda',
      'lodash'
      // 'babel-plugin-redux-saga',
      // 'babel-plugin-styled-components'
    )
  )(config, env)

  return config
}
