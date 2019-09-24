import {
  getOrderStatusNumRequest
} from '../api'

/**
 * 获取订单状态列表
 */
export const getOrderStatusNum = async () => {
  let {data} = await getOrderStatusNumRequest()
  if (data.Data) {
    return data.Data
  }
  return null
}
