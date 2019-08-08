import {
  getCategoryDetailRequest
} from '../api'

/**
 * 获取分类详情
 */
export const getCategoryDetail = async params => {
  let {data} = await getCategoryDetailRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}
