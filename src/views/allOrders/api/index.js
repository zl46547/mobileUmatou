import axios from '../../../http/api'

/**
 * 获取订单列表
 * @param params
 */
export const getOrderListRequest = params => {
  return axios({
    method: 'get',
    url: '/orders/getOrderList',
    params
  })
}

/**
 * 删除订单
 * @param data
 */
export const deleteOrderRequest = data => {
  return axios({
    method: 'POST',
    url: '/orders/deleteOrder',
    data
  })
}
/**
 * 重新下单
 * @param data
 */
export const reOrderRequest = data => {
  return axios({
    method: 'POST',
    url: '/orders/reOrder',
    data
  })
}

/**
 * 确认订单
 * @param data
 */
export const confirmOrderRequest = data => {
  return axios({
    method: 'POST',
    url: '/orders/confirmOrder',
    data
  })
}
