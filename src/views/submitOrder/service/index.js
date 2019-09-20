import {
  getCouponsRequest,
  getDefaultAddressRequest,
  submitOrderRequest
} from '../api'
import { Toast } from 'vant'
/**
 * 获取优惠券列表
 * @param params
 */
export const getCoupons = async params => {
  try {
    let {data} = await getCouponsRequest(params)
    if (data.Data) {
      return data.Data
    }
    return []
  } catch (e) {
    Toast.fail('获取优惠券列表异常')
    console.log(e)
  }
}

/**
 * 获取默认地址
 * @param customerGuid
 */
export const getDefaultAddress = async customerGuid => {
  try {
    let {data} = await getDefaultAddressRequest(customerGuid)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取默认地址异常')
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
    Toast.fail('提交订单异常')
    console.log(e)
  }
}
