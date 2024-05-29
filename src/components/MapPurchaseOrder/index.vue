<template>
  <div class="filter-modal-wrapper">
    <a-drawer
      v-model:open="showValue"
      :title="from === '3' ? $t('purchase.columns.mappingReturnOrder') : $t('return-order.columns.returnOrderAlias')"
      width="80%"
      placement="right"
      @onAfterOpenChange="afterVisibleChange"
    >
      <a-form :model="formData" layout="inline">
        <a-form-item v-if="from === '3'" :label="$t('purchase.columns.purchaseReturnOrder')">
          <a-input allowClear :placeholder="$t('inputTips')" v-model:value="formData.purchaseReturnOrder" />
        </a-form-item>
        <a-form-item v-else :label="$t('purchase.columns.purchaseOrder')">
          <a-input allowClear :placeholder="$t('inputTips')" v-model:value="formData.purchaseOrder" />
        </a-form-item>
        <a-form-item :label="$t('purchase.columns.supplierName')">
          <page-select v-model:value="formData.supplierName" :init-method="initSupplierName" />
          <!-- <a-select
            :options="supplierList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 200px"
            v-model:value="formData.supplierName"
          /> -->
        </a-form-item>

        <a-form-item>
          <div style="text-align: right">
            <a-button type="primary" @click="search">{{ $t('opts.search') }}</a-button>
            <a-button class="ml-1" @click="reset">{{ $t('opts.reset') }}</a-button>
          </div>
        </a-form-item>
      </a-form>
      <div class="mt-1 w100">
        <a-table
          class="ant-table-striped"
          :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
          size="small"
          bordered
          :row-selection="rowSelection()"
          :columns="columnsList"
          :row-key="(record: any) => record.id"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          :scroll="{ y: 'calc(100vh - 400px)' }"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, index }">
            <template v-if="column.dataIndex === 'index'">
              <a>
                {{ (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1 }}
              </a>
            </template>
          </template>
        </a-table>
      </div>
      <div class="ub w100 ub-ac ub-pc opts">
        <a-button class="mr-1" @click="cancel">{{ $t('opts.cancel') }}</a-button>
        <a-button type="primary" @click="handleOk"> {{ $t('opts.sure') }}</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, reactive, ref } from 'vue'
// import { init } from './server'
import useFilterModal from './hooks/useFilterModal'
const { columns, columnsPay, columnsPayReturn } = useFilterModal()
import useTable from '@/hooks/useTable'
const { pagination, selectedRowKeys, selectedRows, rowSelection, clearTableSelected } = useTable()
import { $t } from '@/i18n'
const emit = defineEmits(['update:show', 'success'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  from: {
    require: true,
    type: String,
    default: ''
  },
  selectedIds: {
    type: Array,
    default: () => []
  }
})
const formData = reactive({
  purchaseOrder: '',
  purchaseReturnOrder: '',
  supplierName: undefined
})
const columnsList = computed(() => {
  if (props.from === '1') {
    return columns
  } else if (props.from === '2') {
    return columnsPay
  } else if (props.from === '3') {
    return columnsPayReturn
  } else {
    return []
  }
})
const initSupplierName = () => {
  console.log('初始化')
}
const showValue = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  }
})
const loading = ref<boolean>(false)
let dataSource = reactive<any[]>([])

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      if (props.selectedIds.length) {
        selectedRowKeys.value = props.selectedIds.map((item: any) => item)
      }
      initData()
    } else {
      resetForm()
      pagination.current = 1
    }
  }
)
// 初始化物料PN列表
const initData = async () => {
  loading.value = true
  // let params = {
  //   name: formData.name,
  //   publishYear: formData.publishYear,
  //   publishOrg: formData.publishOrg,
  //   sitable: formData.sitable,
  //   pageNum: pagination.current,
  //   pageSize: pagination.pageSize
  // }
  // let { result } = await init(params)
  // loading.value = false
  // const { total, records } = result
  // pagination.total = total
  // dataSource = records
  setTimeout(() => {
    loading.value = false
    pagination.total = 5
    dataSource = [
      {
        id: '1',
        businessTime: '2024-02-10 12:12:12',
        purchaseOrder: '1213213',
        supplierName: '测试',
        customerName: '测试',
        purchaseQuantity: 23
      }
    ]
  }, 1000)
}
// 查询
const search = () => {
  pagination.current = 1
  initData()
}
// 重置
const reset = () => {
  resetForm()
  pagination.current = 1
  initData()
}
// 改变页数
const handleTableChange = (page: any) => {
  pagination.current = page.current
  pagination.pageSize = page.pageSize
  initData()
}
const resetForm = () => {
  clearTableSelected()
  formData.purchaseOrder = ''
  formData.supplierName = undefined
}
const cancel = () => {
  emit('update:show', false)
  resetForm()
}
const handleOk = () => {
  emit('success', selectedRows.value)
  emit('update:show', false)
}

const afterVisibleChange = (val: boolean) => {
  if (!val) {
    formData.purchaseOrder = ''
    formData.supplierName = undefined
  }
}
</script>

<style lang="scss" scoped>
.opts {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
}
</style>
