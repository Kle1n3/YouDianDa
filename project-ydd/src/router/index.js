import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/mobile'),
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/mobile/home'),
        meta: {
          title: '首页'
        },
      },
      {
        path: 'classify',
        component: () => import('@/views/mobile/classify'),
        meta: {
          title: '分类'
        },
      },
      {
        path: 'release',
        component: () => import('@/views/mobile/release'),
        meta: {
          title: '发布'
        },
      },
      {
        path: 'my',
        component: () => import('@/views/mobile/my'),
        meta: {
          title: '我的'
        },
      },
      {
        path: 'login',
        component: () => import('@/views/mobile/login'),
        meta: {
          title: '登录'
        },
      },
      {
        path: 'reg',
        component: () => import('@/views/mobile/reg'),
        meta: {
          title: '注册'
        },
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
