import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Test from '../views/test'
Vue.use(VueRouter)
import layout from '@/layout'
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: layout
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: layout,
    children:[
      {
        path:'/about1',
        component: () => import(/* webpackChunkName: "about" */ '../views/test')
  
      }
    ]

  }
]

const router = new VueRouter({
  routes
})

export default router
