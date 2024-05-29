<template>
  <a-config-provider :locale="locale" :theme="app.themeConfig">
    <router-view />
    <!-- <context-holder /> -->
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@/hooks/useTheme'
const { initTheme, initModal } = useTheme()
/** 初始化主题 */
initTheme()
/** 初始化布局模式*/
initModal()
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enGB from 'ant-design-vue/es/locale/en_GB'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en-gb'
import { useAppStore } from '@/store/modules/theme.js'
const app = useAppStore()
import { computed } from 'vue'
// import { contextHolder } from "./helpers/msg-helper";
const locale = computed(() => {
  const lang = localStorage.getItem('language') || 'zh'
  if (lang === 'en') {
    dayjs.locale('en-gb')
    return enGB
  } else {
    dayjs.locale('zh-cn')
    return zhCN
  }
})
onMounted(() => {
  console.log('测试小胖')
})
</script>

<style>
.ant-table-tbody > tr > .ant-table-row-cell-break-word:empty::after {
  position: inherit;
  content: '-';
}
.ant-table-tbody > tr > td:empty::after {
  position: inherit;
  content: '-';
}
.ant-descriptions-item-content span:empty::after {
  position: inherit;
  content: '-';
}
.no-empty.ant-descriptions-item-content span:empty::after {
  content: '';
}
</style>
