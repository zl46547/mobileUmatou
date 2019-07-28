import axios from 'axios'
import loading from '../util/showLoading'
import axiosHelper from './axiosHelper'

const api = axios.create()
api.defaults.baseURL = '/api'
api.defaults.timeout = 10000
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// 请求拦截
api.interceptors.request.use((config) => {
  loading.showLoading()
  return axiosHelper.filterParams(config)
}, null)
// 响应拦截
api.interceptors.response.use(response => {
  loading.hideLoading()
  return response
}, error => {
  return axiosHelper.handleError(error)
})

export default api
