import {
  getOrderListRequest
} from '../api'

/**
 * 获取订单列表
 * @param params
 */
export const getOrderList = async params => {
  let {data} = await getOrderListRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}
