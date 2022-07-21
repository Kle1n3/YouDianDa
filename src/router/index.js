import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject)
    return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/views/mobile'),
    meta: {
      title: 'Home',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/mobile/home'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'classify',
        component: () => import('@/views/mobile/classify'),
        meta: {
          title: '分类',
        },
      },
      {
        path: 'release',
        component: () => import('@/views/mobile/release'),
        meta: {
          title: '发布',
        },
      },
      {
        path: 'my',
        component: () => import('@/views/mobile/my'),
        meta: {
          title: '我的',
        },
      },
      {
        path: 'login',
        component: () => import('@/views/mobile/login'),
        meta: {
          title: '登录',
        },
      },
      {
        path: 'reg',
        component: () => import('@/views/mobile/reg'),
        meta: {
          title: '注册',
        },
      },
      {
        path: 'article',
        component: () => import('@/views/mobile/user/myArticle'),
        meta: {
          title: '我的文章',
          needLogin: true,
        },
      },
      {
        path: 'collect',
        component: () => import('@/views/mobile/user/myCollect'),
        meta: {
          title: '我的收藏',
          needLogin: true,
        },
      },
      {
        path: 'like',
        component: () => import('@/views/mobile/user/myLike'),
        meta: {
          title: '我的点赞',
          needLogin: true,
        },
      },
    ]
  },
  {
    path: '/list',
    component: () => import('@/views/list'),
  },
  {
    path: '/details',
    component: () => import('@/views/articleDetail'),
  },
  {
    path: '/profile',
    component: () => import('@/views/mobile/user/userProfile'),
    meta: {
      title: '我的资料',
      needLogin: true,
    },
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (to.meta.needLogin) {
    if (token) {
      next()
    } else {
      next('/login?url=' + to.path)
    }
  }
  else {
    next()
  }
})

export default router
