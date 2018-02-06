<% if (lint) { %>const eslint = require('rollup-plugin-eslint')<% } %><% if (buble) { %>
const buble = require('rollup-plugin-buble')<% } %><% if (babel) { %>
const babel = require('rollup-plugin-babel')<% } %><% if (typescript) { %>
const typescript = require('rollup-plugin-typescript')<% } %>
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

export default {
  entry: './src/index.js',
  dest: './dest/bundle.js',
  format: 'cjs',
  plugins: [<% if (lint) { %>
    eslint(),<% } %><% if (buble) { %>
    buble({
      exclude: 'node_modules/**',
    }),<% } %><% if (babel) { %>
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),<% } %><% if (typescript) { %>
    typescript({
      exclude: 'node_modules/**',
    }),<% } %>
    commonjs({
      namedExports: {},
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ]
}
