import { type RouteRecordRaw, createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { $t } from '@/i18n'
import { useTitle } from '@/hooks/useTitle'
import { setRouteChange } from '@/hooks/useRouteListener'
import { cloneDeep } from 'lodash-es'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
const Layout = () => import('@/layout/index.vue')
const { setTitle } = useTitle()
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    name: 'home',
    meta: {
      title: '首页'
    },
    redirect: '/explore/overview',
    children: []
  },
  {
    path: '/explore',
    redirect: '/explore/overview',
    component: Layout,
    name: 'explore',
    meta: {
      title: '探索'
    },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/explore/overview/index.vue'),
        name: 'overview',
        meta: {
          title: '概览'
        }
      },
      {
        path: 'solution',
        component: () => import('@/views/explore/solution/index.vue'),
        name: 'solution',
        meta: {
          title: '解决方案'
        }
      },
      {
        path: 'industry-dynamics',
        component: () => import('@/views/explore/industry-dynamics/index.vue'),
        name: 'industry-dynamics',
        meta: {
          title: '行业动态'
        }
      },
      {
        path: 'feature-release',
        component: () => import('@/views/explore/feature-release/index.vue'),
        name: 'feature-release',
        meta: {
          title: '特性发布'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    name: '404',
    meta: {
      title: '404'
    }
  },
  {
    path: '/403',
    component: () => import('@/views/error/403.vue'),
    name: '403',
    meta: {
      title: '403'
    }
  }
]
export const getNavPaths = (arr: any) => {
  const navPaths = <any>[]
  const _routes = cloneDeep(arr)
  _routes.forEach((item: any) => {
    navPaths.push(item.path)
    if (item.children) {
      navPaths.push(...getNavPaths(item.children))
    }
  })
  return navPaths
}

const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHashHistory(),
  // 应该添加到路由的初始路由列表。
  routes: constantRoutes
})

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to) => {
  NProgress.done()
  setRouteChange(to)
  setTitle(to.meta.title)
})
// console.log(router.getRoutes());
/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.async) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
export default router
