export default {
  'return-pay-order': {
    title: 'Purchase return settlement form',
    columns: {
      payTime: 'Settlement time',
      payOrder: 'Settlement number',
      payType: 'Settlement Type',
      purchaseOrder: 'Purchase return order',
      mappingOrder: 'Associated purchase return order number',
      payMethod: 'Settlement method',
      payAmount: 'Settlement amount',
      creater: 'Creater',
      currency: 'Currency',
      warehouseName: 'Warehouse name',
      supplierName: 'Supplier name',
      customerName: 'Customer (shipowner) name',
      approvalStatus: 'Approval status',
      approvalNodes: 'Approval nodes',
      remark: 'Remark'
    },
    purchaseOrdernumber: 'Purchase return settlement number',
    tableTitle: 'Header information',
    tab1: 'Annex',
    annex: {
      filename: 'File name'
    }
  }
}
