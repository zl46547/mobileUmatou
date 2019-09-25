import {
  addAddressRequest,
  updateAddressRequest,
  getAddressDetailRequest
} from '../api'
import {Toast} from 'vant'

/**
 * 添加地址
 * @param data
 */
export const addAddress = async data => {
  try {
    let res = await addAddressRequest(data)
    if (res.data.Data) {
      Toast.success('添加成功')
      return res.data.Data
    }
    Toast.fail('添加失败')
  } catch (e) {
    console.error(e)
  }
}
/**
 * 编辑地址
 * @param data
 */
export const updateAddress = async data => {
  try {
    let res = await updateAddressRequest(data)
    if (res.data.Data) {
      Toast.success('编辑成功')
      return res.data.Data
    }
    Toast.fail('编辑失败')
  } catch (e) {
    console.error(e)
  }
}
/**
 * 查询地址详情
 * @param id
 */
export const getAddressDetail = async id => {
  try {
    let res = await getAddressDetailRequest(id)
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}
