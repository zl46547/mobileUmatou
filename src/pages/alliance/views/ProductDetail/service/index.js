import {
  getProductDetailRequest
} from '../api'

/**
 * 获取商品详情
 */
export const getProductDetail = async params => {
  try {
    let {data} = await getProductDetailRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.log(e)
  }
}
