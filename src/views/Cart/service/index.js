import {
  getCartListRequest,
  deleteGoodsRequest,
  setGoodsQuantityRequest
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 获取购物车列表
 */
export const getCartList = async () => {
  try {
    let {data} = await getCartListRequest()
    if (data.Data) {
      return data.Data
    }
    return []
  } catch (e) {
    console.error(e)
  }
}

/**
 * 删除购物车
 * @param params
 */
export const deleteGoods = async params => {
  try {
    let {data} = await deleteGoodsRequest(params)
    if (data.Data) {
      Toast.success('删除成功')
      return data.Data
    }
    Toast.fail('删除失败')
    return null
  } catch (e) {
    console.error(e)
  }
}

/**
 * 加减购物车数量
 * @param params
 */
export const setGoodsQuantity = async params => {
  try {
    let {data} = await setGoodsQuantityRequest(params)
    if (data.Data) {
      return data.Data
    }
    Toast.fail('加减购物车数量失败')
    return null
  } catch (e) {
    console.error(e)
  }
}
