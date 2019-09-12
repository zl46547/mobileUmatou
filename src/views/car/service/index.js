import {
  getCartListRequest,
  deleteGoodsRequest,
  setGoodsQuantityRequest
} from '../api'
import {Toast} from 'vant'

/**
 * 获取购物车列表
 * @param customerGuid
 */
export const getCartList = async customerGuid => {
  try {
    let {data} = await getCartListRequest(customerGuid)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.error(e)
    Toast.fail('获取购物车列表异常')
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
    Toast.fail('删除购物车异常')
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
    Toast.fail('加减购物车数量异常')
  }
}
