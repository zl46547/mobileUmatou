import {
  getTopicActivityRequest,
  submitAddGoods
} from '../api'
import { Toast } from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 获取主题活动信息
 * @param params
 */
export const getTopicActivity = async params => {
  try {
    let res = await getTopicActivityRequest(params)
    if (res.data.data) {
      return res.data.data
    }
    Toast.fail(res.data.message)
    return null
  } catch (e) {
    console.log(e)
  }
}

/**
 * 加入购物车
 */
export const handleAddGoods = async productId => {
  try {
    let {data} = await submitAddGoods(productId)
    if (data.Data) {
      Toast.success('加入成功')
      return data.Data
    }
    Toast.fail('加入购物车失败')
    return null
  } catch (e) {
    console.log(e)
  }
}
