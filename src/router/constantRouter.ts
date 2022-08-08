import layout from '@/layout'

export const constantRouter= [
  {
    path: '/demo',
    name: 'router-name', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
      roles: ['admin'], // 设置该路由进入的权限，支持多个权限叠加
      title: 'demo',// 设置该路由在侧边栏和面包屑中展示的名字
      icon: 'svg-name', // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
      noCache: true, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
      breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
      alwaysShow: true, // 当只有一个子级的时候是否显示根节点
      hidden: false, // 是否不在菜单栏中显示
      affix: true, // 如果设置为true，它则会固定在tags-view中(默认 false)
      // 当路由设置了该属性，则会高亮相对应的侧边栏。
      // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
      // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    },
   
    component:layout
  },
  {
      path: '/login',
      meta: {
        title: '登录',
        hidden:true
      },
      component: ()=>import('@/views/test')
  },
  {
    path: '/',
    children: [
      {
        path: '/home',
        meta: {
          title: '综合面板',
          icon: 'el-icon-eleme',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      },
      {
        path: '/analytics',
        meta: {
          title: '数据分析',
          icon: 'el-icon-phone',
          roles: ['admin'],
        },
        component: ()=>import('@/views/demo')
      }
    ],
    meta: {
      title: '仪表盘',
    },
    component: layout
  },
  {
    path: '/doc',
    children: [
      {
        path: '/doc',
        meta: {
          title: '文档',
          icon: 'el-icon-goods',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      }
    ],
    meta: {
      title: '文档',
    },
    component: layout
  },
  {
    path: '/svg',
    children: [
      {
        path: '/svg',
        meta: {
          title: 'svg',
          icon: 'el-icon-warning',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      }
    ],
    meta: {
      title: 'svg',
      icon:'el-icon-warning'
    },
    component: layout
  },
  {
    path: '/fsf', // 有个坑要填,如果子级大于2个,那个父级的path要设置一个唯一值
    children: [
      {
        path: '/bar',
        meta: {
          title: '柱状图',
          icon: 'home',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      },
      {
        path: '/line',
        meta: {
          title: '折线图',
          icon: 'home',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      },
      {
        path: '/pie',
        meta: {
          title: '饼图',
          icon: 'home',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      }
    ],
    meta: {
      title: '可视化',
      icon:'el-icon-zoom-out'
    },
    component: layout
  },
  {
    path: '/44', // 有个坑要填,如果子级大于2个,那个父级的path要设置一个唯一值
    children: [
      {
        path: '/dragTable',
        meta: {
          title: '可拖拽表格',
          icon: 'home',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      },
      {
        path: '/editTable',
        meta: {
          title: '可编辑表格',
          icon: 'home',
          roles: ['admin'],
        },
        component: ()=>import('@/views/test')
      },
    ],
    meta: {
      title: '表格',
      icon:'el-icon-camera'
    },
    component: layout
  },
]

