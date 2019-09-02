import {
  getOrderStatusNumRequest
} from '../api'

/**
 * 获取订单状态列表
 * @param customerGuid
 */
export const getOrderStatusNum = async customerGuid => {
  let {data} = await getOrderStatusNumRequest(customerGuid)
  if (data.Data) {
    return data.Data
  }
  return null
}
