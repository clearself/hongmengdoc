import { cloneDeep } from 'lodash-es'
import { $t } from '@/i18n'
import dayjs from 'dayjs'
import { useUserStoreHook } from '@/store/modules/user'
const Layout = () => import('@/layout/index.vue')
const modules = import.meta.glob('@/views/**/**.vue')
import { formatNumber } from './../components/Statistic/tools'

// const lang: string = localStorage.getItem('language') || 'zh'
export const handelNull = (val: any) => {
  return val === null ? '' : val
}
export const handelNulStr = (val: any) => {
  return val ? val : ''
}
export const isNull = (val: any): boolean => {
  if (val) {
    return false
  } else {
    return true
  }
}
export const handelResult = (val: any): any[] => {
  if (val === null) return []
  if (val.indexOf(',') > -1) {
    return val.split(',')
  } else {
    return []
  }
}

export function setToken(token: string) {
  return localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  if (getToken()) {
    return localStorage.removeItem('token')
  }
  return null
}
export function clearLocalSrorage() {
  localStorage.clear()
}
export const logout = () => {
  useUserStoreHook().logout()
  location.reload()
  window.location.href = '/login'
}
export const getUserInfo = () => {
  useUserStoreHook().setUser()
}
export const hasPer = (str: string) => {
  return useUserStoreHook().isPer(str)
}

export function getLang() {
  return localStorage.getItem('language') || 'zh'
}

interface MetaItem {
  title?: string
  // isMenu: boolean
  // async: boolean
}
interface ObjItem {
  id: string
  icon?: string
  redirect?: string
  path: string
  name: string
  title: string
  meta: MetaItem
  component?: any
  children?: any[]
}
export const handelRouteToMenu = (menu: any) => {
  if (menu.length === 0) return []
  const arr = []
  const list = cloneDeep(menu)
  for (let i = 0; i < list.length; i++) {
    if (list[i].ignore) continue
    const obj = <ObjItem>{}
    obj.icon = list[i].icon
    obj.path = list[i].path
    obj.name = list[i].name
    if (list[i]?.childMenuList?.length) {
      obj.children = handelRouteToMenu(list[i].childMenuList)
    }
    arr.push(obj)
  }
  return arr
}
export const loadView = (view: string) => {
  let res
  if (view.indexOf(':') > -1) {
    view = view.split(':')[0] + 'index.vue'
  } else {
    view = view + '/index.vue'
  }
  for (const path in modules) {
    const dir = path.substring(4)
    if (view === dir) {
      res = () => modules[path]()
    }
  }
  return res
}
export const handelRouter = (routers: any) => {
  if (routers.length === 0) return []
  const arr = []
  const list = cloneDeep(routers)
  for (let i = 0; i < list.length; i++) {
    const obj = <ObjItem>{}
    obj.icon = list[i].icon
    obj.path = list[i].routePath.charAt(0) !== '/' ? '/' + list[i].routePath : list[i].routePath
    obj.name = list[i].menuName
    if (list[i]?.menuType === 2) {
      obj.component = loadView(
        list[i].routeComponent.charAt(0) !== '/' ? '/' + list[i].routeComponent : list[i].routeComponent
      )
    } else if (list[i]?.menuType === 1) {
      obj.redirect = list[i]?.children ? list[i]?.children[0]?.routePath : '/aa'
      obj.component = Layout
    }
    obj.meta = {}
    obj.meta.title = $t(list[i].menuName)
    if (list[i]?.children?.length) {
      obj.children = handelRouter(list[i].children)
    }
    arr.push(obj)
  }
  return arr
}

// export const handelRouter = (routers: any) => {
//   if (routers.length === 0) return []
//   const arr = []
//   const list = cloneDeep(routers)
//   for (let i = 0; i < list.length; i++) {
//     if ((list[i].menuType === 'FOLDER' || list[i].menuType === 'MENU') && list[i].isValid === 'Y') {
//       const obj = <ObjItem>{}
//       obj.icon = list[i].icon
//       obj.path = list[i].path
//       obj.name = list[i].routeName
//       if (list[i]?.menuType && list[i].menuType === 'FOLDER') {
//         obj.component = Layout
//       } else {
//         obj.component = loadView(list[i].component)
//       }
//       try {
//         if (list[i].metaData) {
//           const metaData = list[i].metaData
//           if (typeof metaData === 'string') {
//             // eslint-disable-next-line no-var
//             var b: any
//             eval('b=' + metaData)
//             obj.meta = b
//           } else {
//             obj.meta = metaData
//           }
//         }
//       } catch (error) {}

//       if (list[i].redirect) {
//         obj.redirect = list[i].redirect
//       }
//       if (list[i]?.childSysMenuLoginDtos?.length) {
//         obj.children = handelRouter(list[i].childSysMenuLoginDtos)
//       }
//       arr.push(obj)
//     }
//   }
//   return arr
// }
export const getDeptIds = (depts: any) => {
  if (depts.length === 0) return []
  const arr = []
  const list = cloneDeep(depts)
  for (let i = 0; i < list.length; i++) {
    if (list[i]?.subSysDeptEntityDTOList?.length) {
      arr.push(list[i].id)
      getDeptIds(list[i].subSysDeptEntityDTOList)
    }
  }
  return arr
}

export const downloadFile = async (id: string, fileName: string) => {
  const link = document.createElement('a')
  const body = document.body
  link.href = '/api/sysAttach/downLoadFileStream?fileId=' + id
  link.download = fileName
  link.style.display = 'none'
  body.appendChild(link)

  link.click()
  body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}

//防抖函数
type CallbackFn = (item?: any) => void

let timer: any = null
export const debounce = (Callback: CallbackFn, delay = 1000) => {
  timer != null ? clearTimeout(timer) : null
  timer = setTimeout(() => {
    Callback && Callback() //当有值才会执行
  }, delay)
}
export const getQueryString = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const search = window.location.search.split('?')[1] || ''
  const r = search.match(reg) || []
  return r[2]
}

/**
 * 获取第一个表格的可视化高度
 * @param {*} extraHeight 额外的高度(表格底部的内容高度 Number类型,默认为74)
 * @param {*} id 当前页面中有多个table时需要制定table的id
 */
export const getTableScroll = (extraHeight?: number, id?: any) => {
  // if (typeof extraHeight == 'undefined') {
  //   //  默认底部分页64 + 边距10
  //   extraHeight = 74
  // }
  extraHeight = extraHeight || 64
  let tHeader = null
  if (id) {
    const tableDom = document.getElementById(id)
    tHeader = tableDom ? tableDom.getElementsByClassName('ant-table-thead')[0] : null
  } else {
    tHeader = document.getElementsByClassName('ant-table-thead')[0]
  }
  //表格内容距离顶部的距离
  let tHeaderBottom = 0
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom
  }
  //窗体高度-表格内容顶部的高度-表格内容底部的高度
  // let height = document.body.clientHeight - tHeaderBottom - extraHeight
  const height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`
  return height
}
//javascript精度除法处理
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
export const accDiv = (arg1, arg2) => {
  let t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  // eslint-disable-next-line prefer-const
  r1 = Number(arg1.toString().replace('.', ''))
  // eslint-disable-next-line prefer-const
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
/*
      javascript精度乘法处理
    乘法函数，用来得到精确的乘法结果
    说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
    调用：accMul(arg1,arg2)
    返回值：arg1乘以arg2的精确结果
 */

export const accMul = (arg1: any, arg2: any) => {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}
//javascript精度加法处理
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
export const accAdd = (arg1: any, arg2: any) => {
  let r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  // eslint-disable-next-line prefer-const
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
// 根据url下载文件
export const handleDownLoadByUrl = (url: string) => {
  try {
    const elementIftrame = document.createElement('iframe')
    elementIftrame.src = url
    elementIftrame.style.display = 'none'
    document.body.appendChild(elementIftrame)
  } catch (error) {
    console.log(error)
  }
}

export const removeEmptyParams = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      delete obj[key]
    } else if (typeof obj[key] === 'object') {
      removeEmptyParams(obj[key])
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key]
      }
    }
  }
  return obj
}
export const removeUndefinedParams = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key]
    } else if (typeof obj[key] === 'object') {
      removeEmptyParams(obj[key])
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key]
      }
    }
  }
  return obj
}
// 根据数据过滤想要code对应的id
export const getfilterId = (code: string | number | undefined, list: any[]) => {
  const _list = list?.length ? cloneDeep(list) : []
  const cur = _list.filter((item) => item.value === code)
  if (cur?.length) {
    return cur[0].id
  } else {
    return ''
  }
}
// 根据数据过滤想要code对应的label
export const getfilterLabel = (code: string | number | undefined, list: any[]) => {
  const _list = list?.length ? cloneDeep(list) : []
  const cur = _list.filter((item) => item.value === code)
  if (cur?.length) {
    return cur[0].label
  } else {
    return '-'
  }
}

// 根据时间戳显示时间
export const timeFormat = (timestamp: number, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  if (!timestamp) {
    return '-'
  }
  return dayjs(timestamp).format(format)
}
