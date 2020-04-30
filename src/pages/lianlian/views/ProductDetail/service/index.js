import {
  getProductsRequest,
  getProductDetailRequest
} from '../api'
import {Toast} from 'vant'

Toast.setDefaultOptions({duration: 1000})

/**
 * 查询商品列表
 */
export const getProducts = async () => {
  try {
    let res = await getProductsRequest()
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}


/**
 * 查看商品详情
 * @param id
 */
export const getProductDetail = async id => {
  try {
    let res = await getProductDetailRequest(id)
    if (res.data.data) {
      return res.data.data
    }
  } catch (e) {
    console.error(e)
  }
}
