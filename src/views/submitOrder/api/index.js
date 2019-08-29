import axios from '../../../http/api'

/**
 * 获取优惠券列表
 * @param params
 */
export const getCouponsRequest = params => {
  return axios({
    method: 'get',
    url: '/orders/getOrderCoupons',
    params
  })
}
