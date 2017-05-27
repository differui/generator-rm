const commonjs = require('rollup-plugin-commonjs')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')<% if (buble) { %>
const buble = require('rollup-plugin-buble')<% } %><% if (babel) { %>
const babel = require('rollup-plugin-babel')<% } %>

export default {
  entry: './src/index.js',
  dest: './dest/bundle.js',
  format: 'cjs',
  plugins: [<% if (buble) { %>
    eslint(),
    buble({
      exclude: 'node_modules/**'
    }),<% } %><% if (babel) { %>
    babel({
      exclude: 'node_modules/**'
    }),<% } %>
    commonjs({
      namedExports: {}
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
