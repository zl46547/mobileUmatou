import {
  getAddressListRequest
} from '../api'

/**
 * 获取地址
 * @param parmas
 */
export const getAddressList = async parmas => {
  try {
    let res = await getAddressListRequest(parmas)
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}
