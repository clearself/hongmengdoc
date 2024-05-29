<template>
  <div style="display: flex" class="left-wrapper top-model">
    <div class="ub ub-ac ub-pc logo-box mr-5">
      <div class="sys_logo" v-if="activeModalName === 'left'">
        <img v-if="collapsed" :src="imgLogoClose" height="30" />
        <img v-else :src="imgLogo" height="30" />
      </div>
      <div v-else class="sys_logo pl-2">
        <img :src="imgLogo" height="30" />
      </div>
    </div>
    <div class="top-menu">
      <a-menu
        class="menu-box"
        theme="light"
        style="border: 0px"
        :selected-keys="[currentPath]"
        @click="menuClick"
        mode="horizontal"
      >
        <template v-for="menuItem in menusInfo" :key="menuItem.path">
          <template v-if="menuItem.children && menuItem.children.length > 0">
            <a-sub-menu :key="menuItem.path">
              <template #title>
                <span>
                  <span class="icon-title">{{ menuItem.name }}</span>
                </span>
              </template>
              <a-menu-item v-for="child in menuItem.children" :key="child.path">{{ child.name }}</a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="menuItem.path">
              <span class="icon-title">{{ menuItem.name }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme'
const { activeModalName } = useTheme()
import { watch, ref, onMounted } from 'vue'
import imgLogo from '@/assets/imgs/logo.jpg'
import imgLogoClose from '@/assets/imgs/logo_close.png'

import { useRouter, useRoute } from 'vue-router' //路由
import { getNavPaths } from '@/routers'
import { useMenusStore } from '@/store/modules/permission'
const store = useMenusStore()
let menusInfo: any[]
menusInfo = store.menuList
const router = useRouter() // 路由
const route = useRoute() // 获取当前路由对象
const collapsed = ref(false)
const navPaths: any = ref([])
watch(
  menusInfo,
  (newVal: any) => {
    navPaths.value = getNavPaths(newVal)
  },
  { immediate: true, deep: true }
)

const menuClick = (item: any) => {
  router.push(item.key)
}
// 处理初始化导航路由
const initRouter = (route: any) => {
  for (let i = 0; i < navPaths.value.length; i++) {
    if (route.fullPath.indexOf(navPaths.value[i]) !== -1) {
      // 如果当前路由与路由匹配上
      currentPath.value = navPaths.value[i] // 设置active
    }
  }
}
onMounted(() => {
  const activePath = menusInfo[0]?.children ? menusInfo[0].children[0].path : menusInfo[0]?.path
  currentPath.value = activePath
  initRouter(route)
})
// 创建响应式变量 当前高亮路由导航
const currentPath = ref('')
// 刷新时候，在当前路由
watch(
  () => router.currentRoute.value,
  (val) => {
    initRouter(val)
  },
  { deep: true }
)
</script>
<style lang="scss" scoped>
.left-wrapper {
  // box-shadow: 0 2px 5px #00000014;
  &.left-modal {
    flex-direction: column;
    height: 100%;
  }
  &.top-model {
    flex: 1;
    height: 50px;
    flex-direction: row;
  }
  .ant-menu-horizontal {
    line-height: 48px;
  }
}
.left-menu {
  width: 170px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  max-width: 240px;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &.collapsed {
    width: 80px;
  }
}
.top-menu {
  flex: 1;
}
.logo-box {
  height: var(--esg-navigationbar-height);
}
.icon-title {
  vertical-align: middle;
}

.menu-icon {
  position: relative;
  top: 1px;
}
</style>
