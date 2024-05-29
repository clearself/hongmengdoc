import { ref, toRefs, reactive, onMounted, computed, nextTick } from 'vue'
import { $t } from '@/i18n'
import { debounce } from 'lodash-es'
import { getTableScroll } from '@/utils/tools'
export default function useTable() {
  const loading = ref<boolean>(false)
  const scrollY = ref('')
  const dataObj = reactive({
    selectedRowKeys: <any>[],
    selectedRows: <any>[]
  })
  const pagination = reactive({
    current: 1,
    pageSize: 30,
    showSizeChanger: true, // 用于控制展示每页多少条的下拉
    showQuickJumper: false,
    total: 0,
    pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
    showTotal: (total: number) => `${$t('total')} ${total} ${$t('pieces')}`,
    onShowSizeChange: pageSizeChange,
    onChange: pageChange
  })
  // 页数改变的方法
  function pageSizeChange(_val: number, pageNum: number) {
    pagination.pageSize = pageNum // 修改每页显示的条数
    pagination.current = 1
  }
  // 点击上一页下一页的方法
  function pageChange(page: number) {
    pagination.current = page
  }
  // 选中处理
  const rowSelection = computed(() => (type: string = 'radio') => {
    const { selectedRowKeys } = dataObj
    return {
      type: type,
      columnWidth: 80,
      columnTitle: type === 'radio' ? $t('columns.selection') : '',
      selectedRowKeys, // 取消选中（必须加上不然无效）
      onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
        dataObj.selectedRowKeys = selectedRowKeys
        dataObj.selectedRows = selectedRows
      }
    }
  })
  // 取消表格选中方法
  const clearTableSelected = () => {
    dataObj.selectedRowKeys = []
    dataObj.selectedRows = []
  }
  onMounted(() => {
    nextTick(() => {
      scrollY.value = getTableScroll()
      window.onresize = debounce(() => {
        scrollY.value = getTableScroll()
      }, 50)
    })
  })

  return {
    ...toRefs(dataObj),
    pagination,
    loading,
    scrollY,
    rowSelection,
    clearTableSelected
  }
}
