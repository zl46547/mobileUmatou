import {
  rateOrderRequest
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 评价订单
 * @param params
 */
export const rateOrder = async params => {
  try {
    let {data} = await rateOrderRequest(params)
    if (data.Data) {
      Toast.success('评价成功')
      return data.Data
    }
    Toast.fail('评价失败')
  } catch (e) {
    console.error(e)
  }
}
