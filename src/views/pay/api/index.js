import axios from '../../../http/api'

/**
 * 根据订单号查询订单
 * @param params
 */
export const getOrderDetailRequest = params => {
  return axios({
    method: 'get',
    url: '/orders/getOrderDetail',
    params
  })
}
