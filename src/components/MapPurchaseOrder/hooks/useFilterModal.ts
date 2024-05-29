import { $t } from '@/i18n'

// 表格分页的配置
export default function useFilterFactorModal() {
  // 设置列
  const columns = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('purchase.columns.businessTime'),
      dataIndex: 'businessTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.purchaseOrder'),
      dataIndex: 'purchaseOrder',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.supplierName'),
      dataIndex: 'supplierName',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.customerName'),
      dataIndex: 'customerName',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.purchaseQuantity'),
      dataIndex: 'purchaseQuantity',
      ellipsis: true,
      width: 100
    },
    {
      title: $t('purchase.columns.purchaseAmount'),
      dataIndex: 'purchaseAmount',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true
    }
  ]
  // 设置列
  const columnsPay = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('purchase.columns.businessTime'),
      dataIndex: 'businessTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.purchaseOrder'),
      dataIndex: 'purchaseOrder',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.supplierName'),
      dataIndex: 'supplierName',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.purchaseQuantity'),
      dataIndex: 'purchaseQuantity',
      ellipsis: true,
      width: 100
    },
    {
      title: $t('purchase.purchaseDetail.actualPurchaseUnitPrice'),
      dataIndex: 'actualPurchaseUnitPrice',
      width: 200,
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.inventoryQuantity'),
      dataIndex: 'inventoryQuantity',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.inventoryAmount'),
      dataIndex: 'inventoryAmount',
      width: 200,
      ellipsis: true
    },
    {
      title: $t('purchase.columns.payAmount'),
      dataIndex: 'payAmount',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.ApprovalPayAmount'),
      dataIndex: 'ApprovalPayAmount',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.noPayAmount'),
      dataIndex: 'noPayAmount',
      ellipsis: true
    }
  ]
  const columnsPayReturn = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('purchase.columns.businessTime'),
      dataIndex: 'businessTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.purchaseReturnOrder'),
      dataIndex: 'purchaseReturnOrder',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.supplierName'),
      dataIndex: 'supplierName',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.totalAmount'),
      dataIndex: 'totalAmount',
      width: 100,
      ellipsis: true
    },
    {
      title: $t('purchase.columns.payAmount'),
      dataIndex: 'payAmount',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.ApprovalPayAmount'),
      dataIndex: 'ApprovalPayAmount',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.noPayAmount'),
      dataIndex: 'noPayAmount',
      ellipsis: true
    }
  ]

  return {
    columns,
    columnsPay,
    columnsPayReturn
  }
}
