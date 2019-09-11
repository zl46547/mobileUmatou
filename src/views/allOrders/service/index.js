import {
  getOrderListRequest,
  deleteOrderRequest,
  reOrderRequest,
  confirmOrderRequest
} from '../api'
import {Toast} from 'vant'
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

/**
 * 确认收货
 * @param params
 */
export const confirmOrder = async params => {
  try {
    let {data} = await confirmOrderRequest(params)
    if (data.Data) {
      Toast.success('收货成功！')
      return data.Data
    }
    Toast.fail('收货失败！')
  } catch (e) {
    Toast.fail('收货异常！')
    console.error(e)
  }
}
