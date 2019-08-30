import {
  getAddressListRequest
} from '../api'

/**
 * 获取地址
 * @param parmas
 */
export const getAddressList = async parmas => {
  let res = await getAddressListRequest(parmas)
  if (res.data.Data) {
    return res.data.Data
  }
  return null
}
