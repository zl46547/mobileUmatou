import axios from '../../../http/api'

/**
 * 获取订单列表
 * @param params
 */
export const getOrderListRequest = params => {
  return axios({
    method: 'get',
    url: '/shoppingCart/getOrderList',
    params
  })
}
