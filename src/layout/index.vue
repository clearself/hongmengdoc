<template>
  <div class="w100">
    <div class="ub w100">
      <div class="ub ub-f1">
        <Menu />
      </div>
      <div style="width: auto">
        <Header />
      </div>
    </div>
    <a-divider style="margin: 0" />
    <div class="w100 main">
      <Content />
    </div>
    <Footer />
  </div>
</template>
<script lang="ts" setup scoped>
import { useMenusStore } from '@/store/modules/permission'
import Header from '@/layout/header/index.vue'
import Menu from '@/layout/menu/index.vue'
import Footer from '@/layout/footer/index.vue'
import Content from '@/layout/content/index.vue'
const store = useMenusStore()
// 初始化菜单
store.generateMenus()
</script>
<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 351px);
  overflow-y: auto;
}
</style>
