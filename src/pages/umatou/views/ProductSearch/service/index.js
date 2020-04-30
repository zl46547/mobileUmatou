import {
  productHotWordRequest,
  keywordSuggestRequest,
  searchProductRequest,
  addGoodsRequest
} from '../api'
import {Toast} from 'vant'

/**
 * 获取查询关键字
 * @param data
 */
export const productHotWord = async data => {
  try {
    let res = await productHotWordRequest(data)
    if (res.data.Data) {
      return res.data.Data
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * 关键字提示搜索
 * @param keyword
 */
export const keywordSuggest = async keyword => {
  try {
    let res = await keywordSuggestRequest(keyword)
    if (res.data.Data) {
      return res.data.Data
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * 商品查询
 * @param params
 */
export const searchProduct = async params => {
  try {
    let res = await searchProductRequest(params)
    if (res.data.Data) {
      return res.data.Data
    }
  } catch (e) {
    console.error(e)
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
