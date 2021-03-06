import {
  getCategoryDetailRequest,
  addGoodsRequest
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 获取分类详情
 */
export const getCategoryDetail = async params => {
  try {
    let {data} = await getCategoryDetailRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.log(e)
  }
}

/**
 * 加入购物车
 */
export const addGoods = async productId => {
  try {
    let {data} = await addGoodsRequest(productId)
    if (data.Data) {
      Toast.success('加入成功')
    } else {
      Toast.fail('加入失败')
    }
  } catch (e) {
    console.log(e)
  }
}
