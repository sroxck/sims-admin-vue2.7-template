import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue2-jsx'

export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx(), ],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://baidu.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//  },
  resolve: { 
    alias: {
      '@components': resolve(__dirname, './src/components'), 
      '@assets': resolve(__dirname, './src/assets/'), 
      '@style': resolve(__dirname, './src/style/'), 
      '@': resolve(__dirname, './src/') 
    }
  }
})
