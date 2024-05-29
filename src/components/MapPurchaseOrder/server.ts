import { request } from '@/utils/service'
export const init = (data: any) => {
  return request<ApiResponseData>({
    method: 'POST',
    url: `/ecmDictEmissionFactor/ecmDictEmissionFactorPageList`,
    data: data
  })
}
// 根据排放因子id获取排放因子详情
export const getEcmEmissionFactorDetail = (data: any) => {
  return request<ApiResponseData>({
    method: 'GET',
    url: `ecmDictEmissionFactor/queryEcmDictEmissionFactorAllDataById/${data.emissionSourceId}`
  })
}
