<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal :getContainer="() => $refs.mymodal" v-model:open="showValue" :title="title" width="600px" :footer="null">
      <div class="mt-1 w100 upload-box">
        <a-upload-dragger
          :showUploadList="false"
          :max-count="10"
          accept="*"
          :before-upload="beforeUpload"
          :customRequest="customRequest"
        >
          <p class="ant-upload-drag-icon">
            <plus-outlined />
          </p>
          <p class="ant-upload-text">
            {{ $t('uploadInfo.method') }}
          </p>
          <p class="ant-upload-hint">
            {{ $t('uploadInfo.tip') }}
          </p>
        </a-upload-dragger>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'
import AliyunSDK from '@/utils/oss'
import { $t } from '@/i18n'
import { requestToken, callbackRequest } from '@/service/index'
const emit = defineEmits(['update:show'])

const props = withDefaults(
  defineProps<{
    title: string
    show: boolean
    orderId: string
    callbackSuccess?: (key?: string) => void
  }>(),
  {
    title: '',
    show: false,
    orderId: ''
  }
)

const showValue = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  }
})
const isAcceptFile = (file: any) => {
  if (file) {
    const fileExtension = file.name.indexOf('.') > -1 ? file.name.split('.').pop() : ''
    return ['jpg', 'jpeg', 'png', 'doc', 'docx', 'xlsx', 'xls', 'ppt', 'pptx', 'pdf', 'txt', 'rar', 'zip'].includes(
      fileExtension
    )
  }
  return false
}
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  return new Promise((resolve, reject) => {
    if (isAcceptFile(file)) {
      if (file.size > 200 * 1024 * 1024) {
        message.info($t('uploadInfo.size'))
        reject('size_exceeded')
      } else {
        resolve(true)
      }
    } else {
      message.info($t('uploadInfo.type'))
    }
  })
}
const initRequest = async (name: string, file: File) => {
  const close = message.loading({
    content: $t('uploadInfo.loading'),
    duration: 0
  })
  const params = {
    orderNo: props.orderId,
    fileName: name
  }
  interface DataProp {
    accessKeyId: string
    accessKeySecret: string
    securityToken: string
    ossFileName: string
    fileId: number
  }
  try {
    const data: DataProp | any = await requestToken(params)
    await AliyunSDK.getInstance(data.accessKeyId, data.accessKeySecret, data.securityToken).uploadOSS(
      data.ossFileName,
      file
    )
    const _params = {
      orderNo: props.orderId,
      fileId: data.fileId
    }
    await callbackRequest(_params)
    props.callbackSuccess && props.callbackSuccess()
    close()
    message.success({
      content: $t('uploadInfo.success')
    })
    // 上传成功后关闭弹框
    emit('update:show', false)
  } catch (error: any) {
    close()
    message.error({
      content: error.response.data.msg
    })
  }
}
const customRequest = (option: any) => {
  const { file }: { file: File } = option
  initRequest(file.name, file)
}
</script>

<style lang="scss" scoped></style>
