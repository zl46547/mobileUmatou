import axios from '../../../http/api'

/**
 * 获取订单状态列表
 * @param customerGuid
 */
export const getOrderStatusNumRequest = customerGuid => {
  return axios({
    method: 'get',
    url: '/orders/getOrderStatusNum',
    params: {customerGuid}
  })
}
