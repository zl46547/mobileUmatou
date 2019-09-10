import {
  getOrderDetailRequest,
  payOrderRequest
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
/**
 * 支付订单
 * @param params
 */
export const payOrder = async params => {
  try {
    let {data} = await payOrderRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}
