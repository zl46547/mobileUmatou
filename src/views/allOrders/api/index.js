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
 * 删除订单
 * @param data
 */
export const reOrderRequest = data => {
  return axios({
    method: 'POST',
    url: '/orders/reOrder',
    data
  })
}
