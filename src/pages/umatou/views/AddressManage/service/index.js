import {
  getAddressListRequest
} from '../api'

/**
 * 获取地址
 */
export const getAddressList = async () => {
  try {
    let res = await getAddressListRequest()
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}
