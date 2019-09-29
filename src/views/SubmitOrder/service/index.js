import {
  getCouponsRequest,
  getDefaultAddressRequest,
  submitOrderRequest
} from '../api'
import { Toast } from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 获取优惠券列表
 */
export const getCoupons = async () => {
  try {
    let {data} = await getCouponsRequest()
    if (data.Data) {
      return data.Data
    }
    return []
  } catch (e) {
    console.log(e)
  }
}

/**
 * 获取默认地址
 */
export const getDefaultAddress = async () => {
  try {
    let {data} = await getDefaultAddressRequest()
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.log(e)
  }
}

/**
 * 提交订单
 * @param params
 */
export const submitOrder = async params => {
  try {
    let {data} = await submitOrderRequest(params)
    if (data.Data) {
      Toast.success('提交订单成功')
      return data.Data
    }
    Toast.fail('提交订单失败')
    return null
  } catch (e) {
    console.log(e)
  }
}
