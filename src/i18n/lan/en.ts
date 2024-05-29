import global from './global/en'
import login from './login/en'
// 待审批
import pending from './my-approval/pending/en'
// 已完成
import completed from './my-approval/completed/en'

// 采购单
import purchase from './create-order/purchase/en'
// 采购退货单
import returnOrder from './create-order/return-order/en'

// 采购结算单
import purchasePay from './pay-manger/purchase/en'
// 采购退货结算单
import returnPayOrder from './pay-manger/return-order/en'

// 数据字典
import dataDic from './data-dic/en'
export default {
  ...global,
  ...login,
  ...pending,
  ...completed,
  ...purchase,
  ...returnOrder,
  ...purchasePay,
  ...returnPayOrder,
  ...dataDic
}
