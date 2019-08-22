let resolve = require('rollup-plugin-node-resolve')
let common = require('rollup-plugin-commonjs')
let babel = require('rollup-plugin-babel')
let typescript = require('rollup-plugin-typescript')
let replace = require('rollup-plugin-replace')
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'
let env = process.env.NODE_ENV
// 默认配置
const defaultPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  common(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),
  uglify(),
  terser({
    compress: {
      // pure_funcs: ['console.log'] // 去掉console.log函数
    }
  })
]
// 多入口配置
const rollupConfig = []
rollupConfig.push({
  input: 'src/index.ts',
  output: {
    name: 'zmyUtils',
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [...defaultPlugins, typescript()],
  external: ['node_modules/**']
})

export default rollupConfig
