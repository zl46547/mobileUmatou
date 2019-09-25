import axios from '../../../http/api'

/**
 * 获取订单状态列表
 */
export const getOrderStatusNumRequest = () => {
  return axios({
    method: 'get',
    url: '/orders/getOrderStatusNum'
  })
}
