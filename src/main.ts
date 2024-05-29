import { createApp } from 'vue'
import './style.css'
// import 'default-passive-events';
import App from './App.vue'
// import cfg from "@/config/config";
import Antd from 'ant-design-vue'
import store from '@/store'
import router from '@/routers'
// import '@/routers/permission'
// import "ant-design-vue/dist/antd.css";
import 'ant-design-vue/dist/reset.css'
import globalComponent from '@/components/index'
import '@/iconfont/iconfont.css'
import '@/styles/index.scss'
import { loadDirectives } from '@/directives'
// 导入多语言
import i18n from '@/i18n'
import SvgIcon from '@/components/svg-icon/SvgIcon.vue'
import '@/assets/iconfont/iconfont.js'
import 'virtual:svg-icons-register'
// console.log("all config:",cfg)
const app = createApp(App)
// 将多语言挂在到vue中
// console.log("app: ", app);
// console.log("app.config.globalProperties: ", app.config.globalProperties);
// export const appConfig = app.config.globalProperties;
// echarts 注册主题
import '@/assets/js/theme/normal.js'
import '@/assets/js/theme/orange.js'
/** 加载自定义指令 */
loadDirectives(app)
app.component('SvgIcon', SvgIcon)
app.use(store).use(globalComponent).use(i18n).use(Antd).use(router)

router.isReady().then(() => {
  app.mount('#app')
})
