import store from '@/store'
import { reactive, toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/tools'
import { resetRouter } from '@/routers'
import { useMenusStore } from '@/store/modules/permission'

interface userItem {
  username: string
  belongOrg: string
  userId: string
  belongOrgName: string
  email: string
  isActive: string
  isSuperAdmin: boolean
  loginAccount: string
  phone: string
  roleName: string
  sex: number
  btnPermList: any
}
export const useUserStore = defineStore('user', () => {
  const _store = useMenusStore()
  const userInfo = reactive<userItem>({
    username: '',
    belongOrg: '',
    userId: '',
    belongOrgName: '',
    email: '',
    isActive: '',
    isSuperAdmin: false,
    loginAccount: '',
    phone: '',
    roleName: '',
    sex: 1,
    btnPermList: []
  })
  // 模拟按钮权限
  const btns = ['btn1', 'btn2']
  /** 设置用户信息 */
  const setUser = () => {
    const userInfoStr = localStorage.getItem('userInfo') as string
    const _userInfo = JSON.parse(userInfoStr)
    userInfo.username = _userInfo?.user_name
    userInfo.userId = _userInfo?.user_id
    userInfo.email = _userInfo?.email
    userInfo.isActive = _userInfo?.isActive
    userInfo.phone = _userInfo?.user_phone
    userInfo.sex = _userInfo?.user_sex
    // userInfo.roleName = _userInfo?.roleName
    // userInfo.btnPermList = _userInfo?.btnPermList
  }
  /** 登出 */
  const logout = () => {
    _store.setMenuList([])
    removeToken()
    // resetRouter()
    sessionStorage.removeItem('tabValue')
    localStorage.removeItem('menus')
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
  }
  const isPer = computed(() => (str: string) => {
    if (userInfo.btnPermList.includes(str)) {
      return false
    } else {
      return true
    }
  })
  return { btns, logout, resetToken, setUser, ...toRefs(userInfo), isPer }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
