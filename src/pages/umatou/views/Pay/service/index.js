import {
  getOrderDetailRequest,
  payOrderRequest
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 获取优惠券列表
 * @param params
 */
export const getOrderDetail = async params => {
  try {
    let {data} = await getOrderDetailRequest(params)
    if (data.Data) {
      return data.Data
    }
    return []
  } catch (e) {
    console.error(e)
  }
}
/**
 * 支付订单
 * @param params
 */
export const payOrder = async params => {
  try {
    let {data} = await payOrderRequest(params)
    if (data.Data) {
      Toast.success('支付成功')
      return data.Data
    }
    Toast.fail('支付失败')
  } catch (e) {
    console.error(e)
  }
}
