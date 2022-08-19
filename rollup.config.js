import typescript from 'rollup-plugin-typescript2';
// import {babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import path from 'path'
import alias from '@rollup/plugin-alias'
import commonjs from 'rollup-plugin-commonjs';
module.exports = [
  {
    input: './src/views/form/index.ts',
    output: [
      {
        file: './dist/index.js',
        format: 'es'
      }
    ],
    external:['element-ui'],
    plugins: [
      commonjs(),
      resolve({
        extensions: ['.vue','.tsx','.jsx'], // 无后缀名引用时，需要识别 .vue 文件
        exclude: '**/node_modules/**'  // 排除node_modules
      }),
      alias({
        entries: [
          {
            find: 'demo-lib', // 别名名称，作为依赖项目需要使用项目名
            replacement: path.resolve(__dirname, 'src'), 
            customResolver: resolve({
              extensions: ['.js', '.jsx', '.vue', '.sass', '.scss']
            })
          }
        ]
      }),
      typescript({
        tsconfig: path.resolve(__dirname, './src/views/form/tsconfig.json'),
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: false,
            declaration: true,
            declarationMap: false,
            // rootDir: './src/views/form',
            outDir: 'dist',
            declarationDir: 'dist'
          }
        }
      }),
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
        extensions: ['.js', '.vue','tsx','jsx']
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