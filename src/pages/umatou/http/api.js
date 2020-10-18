import axios from 'axios'
import axiosHelper from './axiosHelper'

const api = axios.create()
api.defaults.baseURL = '/api'
api.defaults.timeout = 10000
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// 请求拦截
api.interceptors.request.use(config => {
  return axiosHelper.filterParams(config)
}, null)
// 响应拦截
api.interceptors.response.use(response => {
  return response
}, error => {
  return axiosHelper.handleError(error)
})

export default api
