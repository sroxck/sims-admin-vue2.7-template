import layout from '@/layout'

export const asyncRouterMap= [
 
  {
    path: '/home',
    name: 'router-name', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
      roles: ['admin'], // 设置该路由进入的权限，支持多个权限叠加
      title: '首页',// 设置该路由在侧边栏和面包屑中展示的名字
      icon: 'el-icon-s-home', // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
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
    path: '/new',
    children: [
      {
        path: '/news',
        meta: {
          title: '新闻列表',
          roles: ['admin'],
          icon: 'el-icon-eleme'
        },
        component: ()=>import('@/views/news/index.vue')
      },
      
    ],
    meta: {
      alwaysShow: true,
      title: '新闻管理',
      icon: 'el-icon-edit-outline',
    },
    component: layout
  },
  {
    path: '/newsAdd',
    children: [
      {
        path: '/newsAdds',
        meta: {
          title: '新增新闻',
          roles: ['admin'],
          icon: 'el-icon-eleme'
        },
        component: ()=>import('@/views/news/add')
      },
      
    ],
    meta: {
      title: '新闻',
      roles: ['admin'],
      icon: 'el-icon-eleme'
    },
    hidden:true,
    component: layout
  },
  {
    path: '/certificate',
    children: [
      {
        path: '/certificateListList',
        meta: {
          title: '证书列表',
          roles: ['admin'],
          icon: 'el-icon-eleme'
        },
        component: ()=>import('@/views/certificate/list/index.vue')
      },
      {
        path: '/certificateListImport',
        meta: {
          title: '学员导入',
          roles: ['admin'],
          icon: 'el-icon-eleme'
        },
        component: ()=>import('@/views/certificate/import')
      },
    ],
    meta: {
      alwaysShow: true,
      title: '证书管理',
      icon: 'el-icon-s-check',
    },
    component: layout
  },
  {
    path: '/admin',
    children: [
      {
        path: '/user',
        meta: {
          title: '用户管理',
          roles: ['admin'],
          icon: 'el-icon-user'
        },
        component: ()=>import('@/views/test')
      },
    ],
    meta: {
      alwaysShow: true,
      title: '系统管理',
      icon: 'el-icon-s-tools',
    },
    component: layout
  },
 
  { path: '*', redirect: '/404', hidden: true,},
  { path: '/404',hidden: true,meta:{title:'303'} ,  component:layout},
]

