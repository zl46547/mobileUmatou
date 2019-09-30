import axios from '../../../http/api'

/**
 * 获取查询关键字
 */
export const productHotWordRequest = () => {
  return axios({
    method: 'get',
    url: '/products/productHotWord'
  })
}

/**
 * 关键字提示搜索
 * @param keyword
 */
export const keywordSuggestRequest = keyword => {
  return axios({
    method: 'get',
    url: '/products/keywordSuggest',
    params: {keyword}
  })
}

/**
 * 关键字提示搜索
 * @param params
 */
export const searchProductRequest = params => {
  return axios({
    method: 'get',
    url: '/products/searchProduct',
    params
  })
}
