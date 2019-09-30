import {
  productHotWordRequest,
  keywordSuggestRequest,
  searchProductRequest
} from '../api'

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
 * @param keyword
 */
export const searchProduct = async keyword => {
  try {
    let res = await searchProductRequest(keyword)
    if (res.data.Data) {
      return res.data.Data
    }
  } catch (e) {
    console.error(e)
  }
}
