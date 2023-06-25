/*
 * @Author: sroxck
 * @Date: 2023-05-29 10:31:09
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 15:55:53
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue2-jsx'
export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
     
      '/api': {
        target: 'https://dev-tcm-website.boyachain.cn/tcm-website-admin/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      }
    }
 },
  resolve: { 
    alias: {
      '@components': resolve(__dirname, './src/components'), 
      '@assets': resolve(__dirname, './src/assets/'), 
      '@style': resolve(__dirname, './src/style/'), 
      '@': resolve(__dirname, './src/') ,
      '@pub': resolve(__dirname, './public/') 
    }
  }
})
