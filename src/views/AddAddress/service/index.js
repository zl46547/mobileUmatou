import {
  addAddressRequest
} from '../api'

/**
 * 添加地址
 * @param data
 */
export const addAddress = async data => {
  let res = await addAddressRequest(data)
  if (res.data.Data) {
    return res.data.Data
  }
  return null
}
