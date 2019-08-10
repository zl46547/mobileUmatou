import {
  getProductDetailRequest,
  getRateListRequest,
  getRateStatisticsRequest
} from '../api'

/**
 * 获取商品详情
 */
export const getProductDetail = async params => {
  let {data} = await getProductDetailRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 获取评论列表
 */
export const getRateList = async params => {
  let {data} = await getRateListRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 获取评论基础数据
 */
export const getRateStatistics = async params => {
  let {data} = await getRateStatisticsRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}
