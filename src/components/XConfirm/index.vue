<template>
  <a-popconfirm :title="_title" :ok-text="_okText" :cancel-text="_cancelText" @confirm="confirmFun">
    <slot />
  </a-popconfirm>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { $t } from '@/i18n'
const { title, okText, cancelText, data, confirm } = defineProps<{
  title?: string
  okText?: string
  cancelText?: string
  data: object
  confirm: (record: any) => Promise<any>
}>()
const _title = computed(() => {
  return title || $t('sureTips')
})
const _okText = computed(() => {
  return okText || $t('opts.sure')
})
const _cancelText = computed(() => {
  return cancelText || $t('opts.cancel')
})
const confirmFun = () => {
  return new Promise((resolve) => {
    try {
      confirm &&
        confirm(data).then(() => {
          resolve(true)
        })
    } catch (error) {
      console.log(error)
    }
  })
}
</script>

<style lang="scss" scoped></style>
