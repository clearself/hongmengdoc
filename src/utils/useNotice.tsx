import { Notification, Button } from '@arco-design/web-react'
import useUtils from '@/utils/useUtils'
import { $t } from '@/i18n'

import { messageFileApi } from '@/api/login'
import { handleDownLoadByUrl } from '@/utils/public'
function useNotice(data) {
  //e.data.data?.content,e.data.data?.messageId
  const id = useUtils.generateKey()
  const downloadData = async (messageId) => {
    const param = await messageFileApi<string>({ messageId: messageId })
    handleDownLoadByUrl(param)
  }
  Notification.success({
    id,
    title: $t('settings.notice.title'),
    content: data?.content,
    duration: 1000 * 5,
    btn: (
      <span>
        {data?.extension?.fileId && (
          <Button
            type='secondary'
            size='small'
            onClick={() => downloadData(data?.messageId)}
            style={{ margin: '0 12px' }}
          >
            {$t('settings.notice.button.download')}
          </Button>
        )}

        <Button type='primary' size='small' onClick={() => Notification.remove(id)}>
          {$t('settings.notice.button.know')}
        </Button>
      </span>
    )
  })
}

export default useNotice
