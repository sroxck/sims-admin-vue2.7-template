import layout from '@/layout'

export const constantRouter= [
  
 
  {
    path: '/login',
    meta:{hidden:true},
    hidden: true,
    component: ()=>import('@/views/login')
  },
 
 
]

