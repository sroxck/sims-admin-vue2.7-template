/*
 * @Author: sroxck
 * @Date: 2023-05-29 10:31:09
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-25 09:44:18
 * @Description: 
 */
import layout from '@/layout'

export const constantRouter= [
  
 
  {
    path: '/login',
    meta:{hidden:true},
    hidden: true,
    component: ()=>import('@/views/login/index.vue')
  },
 
 
]

