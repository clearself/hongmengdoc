<template>
  <a-select
    popupClassName="page-select-box"
    show-search
    style="width: 100%; min-width: 200px"
    optionFilterProp="label"
    v-model:value="selectedKey"
    :placeholder="placeholder"
    allow-clear
    :virtual="false"
    :filterOption="false"
    @popupScroll="handlePopupScroll"
    @search="searchFun"
  >
    <a-select-option v-for="(item, index) in optionsList" :key="index" :value="item.value">{{
      item.label
    }}</a-select-option>
    <a-select-option v-if="hasmore" class="select-disabled" disabled>
      <div class="ub w100 ub-ac ub-pc">
        <a-spin size="small" />
      </div>
    </a-select-option>
  </a-select>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { debounce, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { $t } from '@/i18n'
import { result } from './data'
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: $t('selectTips')
  },
  initMethod: Function
})
const page = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)
const selectedKey = computed({
  get() {
    return props.value ? props.value : undefined
  },
  set(val) {
    emit('update:value', val)
  }
})
const searchValue = ref('')
let uuid = uuidv4()
interface OptionsList {
  label: string
  value: string | number
}
const optionsList = ref<OptionsList[]>([])
const searchFun = debounce((value: string) => {
  searchValue.value = value
  page.value = 1
  totalPage.value = 0
  initList()
}, 500)
const hasmore = computed(() => {
  let _boolean = false
  if (page.value < totalPage.value) {
    _boolean = true
  }

  return _boolean
})
const getList = (page: number) => {
  return new Promise((resolve) => {
    uuid = uuidv4()
    const _uuid = uuid
    // 模拟接口请求
    setTimeout(() => {
      if (_uuid !== uuid) {
        return
      }
      const _result = searchValue.value
        ? cloneDeep(result.filter((item) => item.label.toLowerCase().indexOf(searchValue.value.toLowerCase()) > -1))
        : cloneDeep(result)
      const startIndex = (page - 1) * pageSize.value
      const endIndex = startIndex + pageSize.value
      const totalPage = Math.ceil(_result.length / pageSize.value)
      const list = _result.slice(startIndex, endIndex)
      const obj = {
        totalPage: totalPage,
        records: list
      }
      resolve(obj)
    }, 500)
  })
}
const initList = () => {
  props.initMethod && props.initMethod()
  getList(page.value).then((res: any) => {
    console.log(res)
    if (page.value === 1) {
      optionsList.value = res.records
    } else {
      optionsList.value = optionsList.value.concat(res.records)
    }
    totalPage.value = res.totalPage
  })
}

const handlePopupScroll = (e: any) => {
  const { scrollHeight, scrollTop, clientHeight } = e.target
  //这里就是通过滚动条判断是否触底，如果触底了就让页码page加1并判断是否小于总数，执行函数
  if (scrollHeight - scrollTop === clientHeight) {
    page.value = page.value + 1
    console.log(page.value, totalPage.value, '333333')
    if (page.value <= totalPage.value) {
      initList()
    } else {
      page.value = totalPage.value
    }
  }
}
onMounted(() => {
  initList()
})
</script>
<style lang="scss">
.page-select-box .ant-select-item-option-disabled.select-disabled {
  cursor: default !important;
}
</style>
