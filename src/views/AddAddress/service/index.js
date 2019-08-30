import {
  addAddressRequest,
  updateAddressRequest,
  getAddressDetailRequest
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
/**
 * 编辑地址
 * @param data
 */
export const updateAddress = async data => {
  let res = await updateAddressRequest(data)
  if (res.data.Data) {
    return res.data.Data
  }
  return null
}
/**
 * 查询地址详情
 * @param id
 */
export const getAddressDetail = async id => {
  let res = await getAddressDetailRequest(id)
  if (res.data.Data) {
    return res.data.Data
  }
  return null
}
