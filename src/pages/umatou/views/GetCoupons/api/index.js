import axios from '../../../http/api'

/**
 * 添加优惠券
 * @param data
 */
export const addCouponsRequest = data => {
  return axios({
    method: 'post',
    url: '/orders/addOrderCoupons',
    data
  })
}
