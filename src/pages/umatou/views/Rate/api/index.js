import axios from '../../../http/api'

/**
 * 评价订单
 * @param data
 */
export const rateOrderRequest = data => {
  return axios({
    method: 'post',
    url: '/orders/rateOrder',
    data
  })
}
