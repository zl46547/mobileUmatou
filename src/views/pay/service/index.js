import {
  getOrderDetailRequest
} from '../api'

/**
 * 获取优惠券列表
 * @param params
 */
export const getOrderDetail = async params => {
  let {data} = await getOrderDetailRequest(params)
  if (data.Data) {
    return data.Data
  }
  return []
}
