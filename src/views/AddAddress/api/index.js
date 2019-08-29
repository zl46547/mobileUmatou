import axios from '../../../http/api'

/**
 * 添加地址
 * @param data
 */
export const addAddressRequest = data => {
  return axios({
    method: 'post',
    url: '/orders/addAddress',
    data
  })
}
