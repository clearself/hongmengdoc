import global from './global/zh'
import login from './login/zh'

// 待审批
import pending from './my-approval/pending/zh'
// 已完成
import completed from './my-approval/completed/zh'

// 采购单
import purchase from './create-order/purchase/zh'
// 采购退货单
import returnOrder from './create-order/return-order/zh'

// 采购结算单
import purchasePay from './pay-manger/purchase/zh'
// 采购退货结算单
import returnPayOrder from './pay-manger/return-order/zh'

// 数据字典
import dataDic from './data-dic/zh'
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
