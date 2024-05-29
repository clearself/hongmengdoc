import { request } from '@/utils/service'

// 根据文件id获取文件url
export const download = (id: string) => {
  return request<ApiResponseData>({
    method: 'POST',
    url: `/sysAttach/downLoadFile`,
    params: {
      fileId: id
    }
  })
}

// 根据文件id获取文件流
export const downloadStream = (id: string) => {
  return request<ApiResponseData>({
    method: 'GET',
    headers: {
      isDownLoadImg: true
    },
    url: `/sysAttach/downLoadFileStream`,
    params: {
      fileId: id
    }
  })
}
export const quit = () => {
  return request<ApiResponseData>({
    method: 'GET',
    url: `/admin/acl/index/logout `
  })
}

export const requestToken = (params: any) => {
  return request<ApiResponseData>({
    method: 'GET',
    url: `/serviceProvider/warehouseInOrder/attachment/upload/token`,
    params: params
  })
}
export const callbackRequest = (params: any) => {
  return request<ApiResponseData>({
    method: 'POST',
    url: `/serviceProvider/warehouseInOrder/attachment`,
    data: params
  })
}
export const downloadTemplate = (url: string) => {
  return request<ApiResponseData>({
    method: 'GET',
    url: url
  })
}
