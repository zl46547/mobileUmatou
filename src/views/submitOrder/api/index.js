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

/**
 * 获取默认地址列表
 * @param customerGuid
 */
export const getDefaultAddressRequest = customerGuid => {
  return axios({
    method: 'get',
    url: '/address/getDefaultAddress',
    params: {customerGuid}
  })
}
