export default {
  'return-order': {
    title: 'Purchase return',
    columns: {
      warehouseName: 'Warehouse name',
      businessTime: 'Business time',
      returnOrder: 'Purchase return',
      returnOrderAlias: 'Associated purchase order number',
      returnReasons: 'Return reason',
      creater: 'Creater',
      supplierName: 'Supplier name',
      customerName: 'Customer (shipowner) name',
      planReturnTime: 'Estimated return time',
      approvalStatus: 'Approval status',
      approvalNodes: 'Approval nodes',
      paymentStatus: 'Payment status',
      outStatus: 'Outbound status',
      returnName: 'Return item name',
      returnQuantity: 'Return quantity',
      payMethod: 'Settlement method',
      ourCompanyCost: 'Our company bears the cost',
      senderInfo: 'Sender information',
      receiveInfo: 'recipient information',
      remark: 'Remark',
      totalAmount: 'Total accounts receivable',
      currency: 'Currency'
    },
    returnOrdernumber: 'Purchase return order number',
    tableTitle: 'Header information',
    orderProcess: 'Order process',
    tab1: 'Return details',
    tab2: 'Annex',
    tab3: 'Outbound records',
    returnOrderDetail: {
      batch: 'Batch No',
      productName: 'Product name',
      materialPN: 'Material PN',
      materialName: 'Material name',
      unit: 'Unit',
      actualPurchaseUnitPrice: 'Actual purchase unit price (including tax)',
      returnQuantity: 'Return quantity',
      returnAmount: 'Return amount (including tax)',
      remark: 'Reamrk',
      boxNum: 'Box No',
      qualityLevel: 'Material quality',
      inventoryQuantity: 'Inventory quantity'
    },
    sender: {
      name: "Sender's name",
      tel: "Sender's phone number",
      country: 'Sender country',
      province: 'From province',
      city: 'From city',
      street: 'Sender Street',
      address: "Sender's detailed address",
      code: "Sender's postal code"
    },
    receiver: {
      name: 'Recipient name',
      tel: 'Recipient phone number',
      country: 'Recipient country',
      province: 'Recipient province',
      city: 'Recipient city',
      street: 'Recipient street',
      address: "Recipient's detailed address",
      code: "Recipient's postal code"
    },
    tip1: 'The return quantity must be ≤ the inventory quantity.',
    tip2: 'The quantity of returns must be filled in as an integer greater than 0.',
    annex: {
      filename: 'File name'
    },
    outRecord: {
      serverOrder: 'Service provider inventory number',
      orderCreateTime: 'Order creation time',
      finishTime: 'Completion time of homework',
      inventoryOrderFinishTime: 'Completion time of inventory order',
      approvalStatus: 'Approval status',
      approvalNodes: 'Approval nodes',
      productName: 'Product name',
      outQuantity: 'Outbound quantity',
      outAmount: 'Outbound amount (including tax)'
    },
    orderProcesslist: {
      role: 'Role',
      users: 'Personnel',
      approvalStatus: 'Approval status',
      approvalTime: 'Approval time',
      approvalOpinions: 'Approval opinions'
    }
  }
}
