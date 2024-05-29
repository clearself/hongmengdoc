<template>
  <div class="sys_header top-header">
    <div class="ub ub-f1 ub-ac ub-pe right">
      <!-- 用户信息 -->
      <div class="ml-2">
        <a-dropdown placement="bottom">
          <div class="ub ub-ac">
            <a-avatar :size="24">
              <template #icon><UserOutlined class="icon" /></template>
            </a-avatar>
            <div class="ml-1 user-name heder-text">{{ username }}</div>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="exit">{{ $t('head.exit') }}</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup scoped>
import { $t } from '@/i18n'
import { storeToRefs } from 'pinia'
// import {quit} from '@/service'
import { logout, getUserInfo } from '@/utils/tools'
import { useUserStoreHook } from '@/store/modules/user'

const userStore = useUserStoreHook()
const { username } = storeToRefs(userStore)
import { UserOutlined } from '@ant-design/icons-vue'

getUserInfo()

const exit = () => {
  logout()
  // quit().then(()=>{
  //   logout()
  // })
}
</script>
<style lang="scss" scoped>
.sys_header {
  height: var(--esg-navigationbar-height);
  background-color: #ffffff;
  display: flex !important;
  width: 100%;
  z-index: 999;
  flex-direction: row;
  :deep(.anticon.icon) * {
    font-size: 18px !important;
  }
}
.ant-dropdown-link {
  color: var(--icon-header-color);
}
.right {
  padding-right: 20px;
}
.user-name {
  font-size: 14px;
  color: var(--icon-header-color);
}
</style>
