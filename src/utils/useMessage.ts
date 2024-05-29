import messageWorker from '@/utils/message.worker.js?worker'
import { v4 as uuidv4 } from 'uuid'
import { notification, Button } from 'ant-design-vue'
import { CheckCircleFilled } from '@ant-design/icons-vue'
import { handleDownLoadByUrl } from '@/utils/tools'
import { $t } from '@/i18n'
import { h } from 'vue'
let isWorkerCreated = false
const downloadData = async (messageId) => {
  console.log(messageId, 'messageId')
  // const param = await messageFileApi<string>({ messageId: messageId })
  handleDownLoadByUrl(param)
}
export const getMessage = () => {
  if (!isWorkerCreated && !window.location.pathname.includes('/manage')) {
    isWorkerCreated = true
    const worker = new messageWorker()
    worker.postMessage({
      url: (import.meta.env.VITE_API_URL as string) + '/serviceProvider/message/latest',
      token: localStorage.getItem('token')
    })
    worker.addEventListener('message', (e) => {
      // 接收消息
      if (window.location.pathname.includes('login') || window.location.pathname.includes('/manage')) {
        worker.terminate()
        isWorkerCreated = false
      } else {
        if (e.data.code == 200 && e.data.messageId !== '-1') {
          e.data.data && localStorage.setItem('messageId', e.data.messageId)
          const key = uuidv4()
          e.data.data?.content &&
            notification.open({
              message: $t('notice.title'),
              description: e.data.data?.content,
              btn: () => [
                h(
                  Button,
                  {
                    size: 'small',
                    onClick: () => downloadData(e.data.data.messageId),
                    style: { marginRight: '10px' }
                  },
                  { default: () => $t('notice.download') }
                ),
                h(
                  Button,
                  {
                    type: 'primary',
                    size: 'small',
                    onClick: () => notification.close(key)
                  },
                  { default: () => $t('notice.know') }
                )
              ],
              icon: () => h(CheckCircleFilled, { style: 'color: rgb(76, 210, 99)' }),
              key
            })
        } else if (e.data.code == 5017 || e.data.code == 5018 || e.data.code == 5016) {
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          localStorage.removeItem('InitRouter')

          alert(1)
          window.location.href = '/login'
        }
      }
    })
    addEventListener('error', (event) => {
      console.log(JSON.stringify(event))

      console.log('There is an error with your worker!')
    })
  }
}
