import {
  materialSearchRequest
} from '../api'

/**
 * 获取查询关键字
 * @param params
 */
export const materialSearch = async params => {
  try {
    let res = await materialSearchRequest(params)
    if (res.data.Data) {
      return res.data.Data
    }
  } catch (e) {
    console.error(e)
  }
}
