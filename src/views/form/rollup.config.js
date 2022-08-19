
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
module.exports = [
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'es'
      }
    ],
    plugins: [
      resolve({
        extensions: ['.vue', '.js']
      }),
      vue({
        // Dynamically inject css as a <style> tag
        css: true, 
        // Explicitly convert template to render function
        compileTemplate: true
      }),
      terser(),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.vue']
      }),
      postcss({
        plugins: [require('autoprefixer')],
        // 把 css 插入到 style 中
        inject: true,
        // 把 css 放到和js同一目录
        // extract: true,
        minimize: true,
        sourceMap: false,
        extensions: ['.sass', '.scss', '.less', '.css']
      }),
    ]
  }
]