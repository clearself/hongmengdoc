import { request } from '@/utils/service'
// 供货商名称接口
export const initSupplier = () => {
  return request<ApiResponseData>({
    method: 'GET',
    url: `/rbac/orgList`
  })
}
// 客户名称接口
export const initCustomer = () => {
  return request<ApiResponseData>({
    method: 'GET',
    url: `/rbac/orgList`
  })
}
// 仓库名称接口
export const initWarehouse = () => {
  return request<ApiResponseData>({
    method: 'GET',
    url: `/rbac/orgList`
  })
}
