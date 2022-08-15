import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
Vue.config.productionTip = false
import 'normalize.css/normalize.css'
import {store} from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/permission'
Vue.use(ElementUI);

new Vue({
  router,
  pinia:store,
  render: h => h(App)
}).$mount('#app')
