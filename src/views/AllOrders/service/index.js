import {
  getOrderListRequest,
  deleteOrderRequest,
  reOrderRequest,
  confirmOrderRequest
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 获取订单列表
 * @param params
 */
export const getOrderList = async params => {
  try {
    let {data} = await getOrderListRequest(params)
    if (data.Data) {
      return data.Data
    }
    return []
  } catch (e) {
    console.error(e)
  }
}

/**
 * 删除订单
 * @param params
 */
export const deleteOrder = async params => {
  try {
    let {data} = await deleteOrderRequest(params)
    if (data.Data) {
      Toast.success('订单删除成功！')
      return data.Data
    }
    Toast.fail('订单删除失败！')
    return null
  } catch (e) {
    console.error(e)
  }
}

/**
 * 重新下单
 * @param params
 */
export const reOrder = async params => {
  try {
    let {data} = await reOrderRequest(params)
    if (data.Data) {
      Toast.success('重新下单成功！')
      return data.Data
    }
    Toast.fail('重新下单失败！')
    return null
  } catch (e) {
    console.error(e)
  }
}

/**
 * 确认收货
 * @param params
 */
export const confirmOrder = async params => {
  try {
    let {data} = await confirmOrderRequest(params)
    if (data.Data) {
      Toast.success('收货成功！')
      return data.Data
    }
    Toast.fail('收货失败！')
  } catch (e) {
    console.error(e)
  }
}
