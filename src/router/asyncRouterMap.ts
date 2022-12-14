import layout from '@/layout'

export const asyncRouterMap= [
 
  {
    path: '/home',
    name: 'router-name', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
      roles: ['admin'], // 设置该路由进入的权限，支持多个权限叠加
      title: '首页',// 设置该路由在侧边栏和面包屑中展示的名字
      icon: 'el-icon-eleme', // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
      noCache: true, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
      breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
      // alwaysShow: true, // 当只有一个子级的时候是否显示根节点
      hidden: false, // 是否不在菜单栏中显示
      affix: true, // 如果设置为true，它则会固定在tags-view中(默认 false)
      // 当路由设置了该属性，则会高亮相对应的侧边栏。
      // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
      // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    },
    children: [
      {
        path: '/home',
        meta: {
          title: '首页',
          roles: ['admin'],
        },
        component: ()=>import('@/views/demo.vue')
      },
    ],
    component:layout
  },
 {
    path: '/test',
    children: [
      {
        path: '/form',
        meta: {
          title: '表单生成器',
          roles: ['admin'],
          icon: 'el-icon-eleme'
        },
        component: ()=>import('@/views/test')
      },
      {
        path: '/lcdata',
        meta: {
          title: '数据标注',
          roles: ['admin'],
        },
        component: ()=>import('@/views/annotation')
      },
    ],
    meta: {
      title: 'demo演示',
      icon: 'el-icon-eleme',
    },
    component: layout
  },
  // {
  //   path: '/ces',
  //   children: [
  //     {
  //       path: '/home',
  //       meta: {
  //         title: '综合面板',
  //         roles: ['admin'],
  //       },
       
  //       component: ()=>import('@/views/test')
  //     },
  //     {
  //       path: '/analytics',
  //       meta: {
  //         title: '数据分析',
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/demo.vue')
  //     }
  //   ],
  //   meta: {
  //     title: '分析数据',
  //     icon: 'el-icon-eleme',
  //   },
  //   component: layout
  // },
  // {
  //   path: '/doc',
  //   children: [
  //     {
  //       path: '/doc',
  //       meta: {
  //         title: '官方文档',
  //         // icon: 'el-icon-goods',
  //         roles: ['admin'],
  //       },
  //       children:[
  //         {
  //           path: '/444',
  //           meta: {
  //             title: '测试层级1-1',
  //             // icon: 'el-icon-eleme',
  //             roles: ['admin'],
  //           },
  //           component: ()=>import('@/views/test')
  //         },
  //         {
  //           path: '/33333',
  //           meta: {
  //             title: '测试层级1-2',
  //             // icon: 'el-icon-phone',
  //             roles: ['admin'],
  //           },
  //           component: ()=>import('@/views/demo.vue')
  //         }
  //       ],
  //       component: ()=>import('@/views/test')
  //     }
  //   ],
  //   meta: {
  //     title: '测试文档',
  //     alwaysShow: true,

  //     icon: 'el-icon-eleme',
  //   },
  //   component: layout
  // },
  // {
  //   path: '/svg',
  //   children: [
  //     {
  //       path: '/svg',
  //       meta: {
  //         title: 'svg',
  //         icon: 'el-icon-warning',
  //         roles: ['admin'],

  //       },
  //       component: ()=>import('@/views/test')
  //     }
  //   ],
  //   meta: {
  //     title: '怎么回事',
  //     // alwaysShow: true,

  //     icon:'el-icon-warning'
  //   },
  //   component: layout
  // },
  // {
  //   path: '/fsf', // 有个坑要填,如果子级大于2个,那个父级的path要设置一个唯一值
  //   children: [
  //     {
  //       path: '/bar',
  //       meta: {
  //         title: '柱状图',
          
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/test')
  //     },
  //     {
  //       path: '/line',
  //       meta: {
  //         title: '折线图',
          
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/test')
  //     },
  //     {
  //       path: '/pie',
  //       meta: {
  //         title: '饼图',
          
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/test')
  //     }
  //   ],
  //   meta: {
  //     title: '可视化',
  //     icon:'el-icon-zoom-out'
  //   },
  //   component: layout
  // },
  // {
  //   path: '/44', // 有个坑要填,如果子级大于2个,那个父级的path要设置一个唯一值
  //   children: [
  //     {
  //       path: '/dragTable',
  //       meta: {
  //         title: '可拖拽表格',
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/test')
  //     },
  //     {
  //       path: '/editTable',
  //       meta: {
  //         title: '可编辑表格',
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/test')
  //     },
  //   ],
  //   meta: {
  //     title: '表格',
  //     icon:'el-icon-camera'
  //   },
  //   component: layout
  // },
  // {
  //   path: '/fsf', // 有个坑要填,如果子级大于2个,那个父级的path要设置一个唯一值
  //   children: [
  //     {
  //       path: '/rolesamin',
  //       meta: {
  //         title: '用户管理',
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/system/user/index.vue')
  //     },
  //     {
  //       path: '/role',
  //       meta: {
  //         title: '角色管理',
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/system/role/index.vue')
  //     },
  //     {
  //       path: '/editTable2',
  //       meta: {
  //         title: '菜单管理',
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/system/menu/index.vue')
  //     },
  //     {
  //       path: '/editTable3',
  //       meta: {
  //         title: '接口管理',
  //         roles: ['admin'],
  //       },
  //       component: ()=>import('@/views/system/access/index.vue')
  //     },
  //   ],
  //   meta: {
  //     title: '系统管理',
  //     icon:'el-icon-camera'
  //   },
  //   component: layout
  // },
  { path: '*', redirect: '/404', hidden: true,},
  { path: '/404',hidden: true,meta:{title:'303'} ,  component:layout},
]

