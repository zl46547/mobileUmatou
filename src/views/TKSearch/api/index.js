import axios from '../../../http/api'

/**
 * 关键字搜索
 * @param params
 */
export const materialSearchRequest = params => {
  return axios({
    method: 'get',
    url: '/tkTools/materialSearch',
    params
  })
}

