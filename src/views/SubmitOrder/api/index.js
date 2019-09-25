import axios from '../../../http/api'

/**
 * 获取优惠券列表
 */
export const getCouponsRequest = () => {
  return axios({
    method: 'get',
    url: '/orders/getOrderCoupons'
  })
}

/**
 * 获取默认地址列表
 */
export const getDefaultAddressRequest = () => {
  return axios({
    method: 'get',
    url: '/address/getDefaultAddress'
  })
}

/**
 * 提交订单
 * @param data
 */
export const submitOrderRequest = data => {
  return axios({
    method: 'post',
    url: '/orders/submitOrder',
    data
  })
}
