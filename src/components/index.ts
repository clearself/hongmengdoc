import type { App, Component } from 'vue'
// svg显示组件封装
import IconSvg from '@/components/IconSvg/index.vue'
// 栅格布局组件
import SRow from '@/components/Row/index.vue'
import SCol from '@/components/Col/index.vue'
// 数字动画封装
import NumberAnimation from './NumberAnimation/index.vue'
// 多语言切换封装
import I18n from './I18n/index.vue'
// 订单进程组件封装
import OrderProcess from './OrderProcess/index.vue'
// 上传附件封装
import UploadAnnex from './UploadAnnex/index.vue'
// 导入上传组件封装
import UploadImport from './UploadImport/index.vue'
// 采购单单选公共组件封装
import MapPurchaseOrder from './MapPurchaseOrder/index.vue'
// 下拉选搜索分页组件封装
import PageSelect from './PageSelect/index.vue'
// 二次封装确认弹框
import XConfirm from './XConfirm/index.vue'

const components: { [name: string]: Component } = {
  IconSvg,
  SRow,
  SCol,
  NumberAnimation,
  I18n,
  OrderProcess,
  UploadAnnex,
  UploadImport,
  MapPurchaseOrder,
  PageSelect,
  XConfirm
}
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  }
}
