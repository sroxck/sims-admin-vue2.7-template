import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
Vue.config.productionTip = false
// import "tailwindcss/tailwind.css"
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
