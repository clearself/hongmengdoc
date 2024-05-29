import { defineStore } from 'pinia' // 定义容器
import store from '@/store'
import { cloneDeep } from 'lodash-es'
import { handelRouteToMenu } from '@/utils/tools'
import { routerlist } from '@/routers/data'
export const useMenusStore = defineStore('permission', {
  state: () => {
    return {
      menuList: [], //菜单信息
      menuRouter: []
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {},
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    //菜单
    setMenuList(data: any) {
      this.menuList = data
    },
    //设置路由：data-->后端传入的路由信息
    setMenuRouter(data: any) {
      this.menuRouter = cloneDeep(data)
    },
    generateMenus() {
      //获取路由信息
      return new Promise((resolve: any) => {
        const arr = routerlist
        // 设置左侧菜单
        const menus = handelRouteToMenu(arr)
        this.setMenuList(menus)
        setTimeout(() => {
          resolve()
        }, 100)
      })
    }
  }
})

/** 在 setup 外使用 */
export function useMenusStoreHook() {
  return useMenusStore(store)
}
