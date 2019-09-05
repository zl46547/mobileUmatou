import {
  getOrderListRequest,
  deleteOrderRequest,
  reOrderRequest
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
  return []
}

/**
 * 删除订单
 * @param params
 */
export const deleteOrder = async params => {
  let {data} = await deleteOrderRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 重新下单
 * @param params
 */
export const reOrder = async params => {
  let {data} = await reOrderRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}
