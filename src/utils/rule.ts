import type { Rule } from 'ant-design-vue/es/form'
import { $t } from '@/i18n'
// >0,保留两位小数
export const overZeroSaveTwo = async (_rule: Rule, value: string) => {
  const re = /^\d+(\.\d{1,2})?$/
  if ((value && !re.test(value)) || value === '0') {
    return Promise.reject($t('placeholder0'))
  } else {
    return Promise.resolve()
  }
}
