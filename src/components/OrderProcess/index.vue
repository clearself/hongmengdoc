<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="$t('return-order.orderProcess')"
      width="50%"
      :footer="null"
    >
      <div class="mt-1 w100">
        <a-table
          class="ant-table-striped"
          :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
          size="small"
          bordered
          :columns="columns"
          :row-key="(record: any) => record.id"
          :data-source="dataSource"
          :pagination="false"
          :loading="loading"
        >
          <template #bodyCell="{ column, index }">
            <template v-if="column.dataIndex === 'index'">
              <a>
                {{ parseInt(index) + 1 }}
              </a>
            </template>
          </template>
        </a-table>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { $t } from '@/i18n'
const columns = ref([
  {
    title: $t('columns.index'),
    dataIndex: 'index',
    fixed: 'left',
    width: 50
  },
  {
    title: $t('return-order.orderProcesslist.role'),
    dataIndex: 'role',
    ellipsis: true
  },
  {
    title: $t('return-order.orderProcesslist.users'),
    dataIndex: 'users',
    ellipsis: true
  },
  {
    title: $t('return-order.orderProcesslist.approvalStatus'),
    dataIndex: 'approvalStatus',
    ellipsis: true
  },
  {
    title: $t('return-order.orderProcesslist.approvalTime'),
    dataIndex: 'approvalTime',
    ellipsis: true
  },
  {
    title: $t('return-order.orderProcesslist.approvalOpinions'),
    dataIndex: 'approvalOpinions',
    ellipsis: true
  }
])
const emit = defineEmits(['update:show'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  orderId: {
    type: String,
    default: ''
  }
})
const loading = ref<boolean>(false)
const dataSource = ref<any[]>([])
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      initData()
    }
  }
)
// 初始化退货明细数据源列表
const initData = async () => {
  loading.value = true
  // let params = {
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
    dataSource.value = [
      {
        id: '1',
        batch: '批次号',
        productName: '品名',
        materialPN: '物料PN',
        materialName: '物料名称',
        unit: '单位',
        returnQuantity: '2',
        remark: '424',
        boxNum: '箱号',
        qualityLevel: '物料品质',
        inventoryQuantity: 20
      }
    ]
  }, 1000)
}
const showValue = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  }
})
</script>

<style lang="scss" scoped></style>
