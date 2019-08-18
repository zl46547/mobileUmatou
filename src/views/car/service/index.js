import {
 getCartListRequest,
  deleteGoodsRequest
} from '../api'

/**
 * 获取购物车列表
 * @param params
 */
export const getCartList = async params => {
  let {data} = await getCartListRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 删除购物车
 * @param params
 */
export const deleteGoods = async params => {
  let {data} = await deleteGoodsRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}
