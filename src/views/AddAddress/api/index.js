import axios from '../../../http/api'

/**
 * 添加地址
 * @param data
 */
export const addAddressRequest = data => {
  return axios({
    method: 'post',
    url: '/address/addAddress',
    data
  })
}

/**
 * 编辑地址
 * @param data
 */
export const updateAddressRequest = data => {
  return axios({
    method: 'post',
    url: '/address/updateAddress',
    data
  })
}

/**
 * 地址详情
 * @param id
 */
export const getAddressDetailRequest = id => {
  return axios({
    method: 'get',
    url: '/address/getAddressDetail',
    params: {id}
  })
}
