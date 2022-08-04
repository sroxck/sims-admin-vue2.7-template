import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
Vue.config.productionTip = false
// import "tailwindcss/tailwind.css"
import {store} from './store/index'
new Vue({
  router,
  pinia:store,
  render: h => h(App)
}).$mount('#app')
