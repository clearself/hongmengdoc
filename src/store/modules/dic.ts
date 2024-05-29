import { defineStore } from 'pinia'
// import { initSupplier,initCustomer,initWarehouse } from "@/service/dic"

export const useDicStore = defineStore('dic', {
  state: () => ({
    supplierList: <any>[], // 供应商列表
    customerList: <any>[], // 客户（货主）名称列表
    warehouseList: <any>[], // 仓库名称列表
    // 入库状态
    inStatusList: [
      {
        label: '未入库',
        value: '0'
      },
      {
        label: '部分入库',
        value: '1'
      },
      {
        label: '全部入库',
        value: '2'
      }
    ],
    // 入库状态
    outStatusList: [
      {
        label: '未出库',
        value: '0'
      },
      {
        label: '部分出库',
        value: '1'
      },
      {
        label: '全部出库',
        value: '2'
      }
    ],
    // 付款状态
    payStatusList: [
      {
        label: '未结算',
        value: '0'
      },
      {
        label: '部分结算',
        value: '1'
      },
      {
        label: '全部结算',
        value: '2'
      }
    ],
    // 审批状态状态
    approvalStatusList: [
      {
        label: '被驳回',
        value: '0'
      },
      {
        label: '审批中',
        value: '1'
      },
      {
        label: '已完成',
        value: '2'
      }
    ],
    // 结算方式
    payMethodList: [
      {
        label: '现金',
        value: '0'
      },
      {
        label: '银行转账',
        value: '1'
      },
      {
        label: '微信',
        value: '2'
      },
      {
        label: '支付宝',
        value: '3'
      }
    ],
    // 退货原因
    returnReasonsList: [
      {
        label: '质量问题',
        value: '0'
      },
      {
        label: '发错货物',
        value: '1'
      }
    ],
    // 币种
    currencyList: [
      {
        label: '人民币',
        value: '0'
      },
      {
        label: '美元',
        value: '1'
      },
      {
        label: '日元',
        value: '2'
      },
      {
        label: '英镑',
        value: '3'
      },
      {
        label: '欧元',
        value: '4'
      }
    ],
    // 采购原因
    purchaseReasons: [
      {
        label: '补货',
        value: '0'
      }
    ],
    // 结算类型
    payTypeList: [
      {
        label: '货款',
        value: '0'
      },
      {
        label: '预付款',
        value: '1'
      }
    ]
  }),
  actions: {
    async initSupplierList() {
      // if(this.supplierList.length>0) return
      // const response = await initSupplier()
      // const { result } = response
      const result = [
        {
          id: '1',
          name: '小卖部1'
        },
        {
          id: '2',
          name: '小卖部2'
        },
        {
          id: '3',
          name: '小卖部3'
        }
      ]
      this.supplierList = result.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    },
    async initCustomerList() {
      // if(this.supplierList.length>0) return
      // const response = await initSupplier()
      // const { result } = response
      const result = [
        {
          id: '1',
          name: '客户1'
        },
        {
          id: '2',
          name: '客户2'
        },
        {
          id: '3',
          name: '客户3'
        }
      ]
      this.customerList = result.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    },
    async initWarehouseList() {
      // if(this.supplierList.length>0) return
      // const response = await initSupplier()
      // const { result } = response
      const result = [
        {
          id: '1',
          name: '仓库1'
        },
        {
          id: '2',
          name: '仓库2'
        },
        {
          id: '3',
          name: '仓库3'
        }
      ]
      this.warehouseList = result.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  }
})
