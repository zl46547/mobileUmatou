import axios from '../../../http/api'

/**
 * 获取地址
 */
export const getAddressListRequest = () => {
  return axios({
    method: 'get',
    url: '/address/getAddressList'
  })
}
