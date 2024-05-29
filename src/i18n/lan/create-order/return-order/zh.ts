export default {
  'return-order': {
    title: '采购退货单',
    columns: {
      warehouseName: '仓库名称',
      businessTime: '业务时间',
      returnOrder: '采购退货单',
      returnOrderAlias: '关联采购单号',
      returnReasons: '退货原因',
      creater: '创建人',
      supplierName: '供货商名称',
      customerName: '客户（货主）名称',
      planReturnTime: '预计退货时间',
      approvalStatus: '审批状态',
      approvalNodes: '审批节点',
      paymentStatus: '收款状态',
      outStatus: '出库状态',
      returnName: '退货品名',
      returnQuantity: '采购数量',
      payMethod: '结算方式',
      ourCompanyCost: '我司承担费用',
      senderInfo: '发件人信息',
      receiveInfo: '收件人信息',
      remark: '备注',
      totalAmount: '应收款总计',
      currency: '币种'
    },
    returnOrdernumber: '采购退货单号',
    tableTitle: '表头信息',
    orderProcess: '订单流程',
    tab1: '退货明细',
    tab2: '附件',
    tab3: '出库记录',
    returnOrderDetail: {
      batch: '批次号',
      productName: '品名',
      materialPN: '物料PN',
      materialName: '物料名称',
      unit: '单位',
      actualPurchaseUnitPrice: '实际采购单价（含税）',
      returnQuantity: '退货数量',
      returnAmount: '退货金额（含税）',
      remark: '备注',
      boxNum: '箱号',
      qualityLevel: '物料品质',
      inventoryQuantity: '库存数量'
    },
    sender: {
      name: '发件人姓名',
      tel: '发件人电话',
      country: '发件人国家',
      province: '发件人省',
      city: '发件人市',
      street: '发件人街道',
      address: '发件人详细地址',
      code: '发件人邮编'
    },
    receiver: {
      name: '收件人姓名',
      tel: '收件人电话',
      country: '收件人国家',
      province: '收件人省',
      city: '收件人市',
      street: '收件人街道',
      address: '收件人详细地址',
      code: '收件人邮编'
    },
    tip1: '退货数量必须≤库存数量',
    tip2: '退货数量须填写＞0整数。',
    annex: {
      filename: '文件名称'
    },
    outRecord: {
      serverOrder: '服务商库单号',
      orderCreateTime: '创单时间',
      finishTime: '作业完成时间',
      inventoryOrderFinishTime: '库单完成时间',
      approvalStatus: '审批状态',
      approvalNodes: '审批节点',
      productName: '品名',
      outQuantity: '出库数量',
      outAmount: '出库金额（含税）'
    },
    orderProcesslist: {
      role: '角色',
      users: '人员',
      approvalStatus: '审批状态',
      approvalTime: '审批时间',
      approvalOpinions: '审批意见'
    }
  }
}
