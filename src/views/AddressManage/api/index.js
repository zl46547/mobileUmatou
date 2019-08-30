import axios from '../../../http/api'

/**
 * 获取地址
 * @param params
 */
export const getAddressListRequest = params => {
  return axios({
    method: 'get',
    url: '/address/getAddressList',
    params
  })
}
