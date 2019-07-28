import { Toast } from 'vant'
import store from '@/vuex/store.js'
import router from '../router'
import 'vant/lib/index.css'
// import { clearUserInfo } from '../utils'
class BaseAxiosHelper {
  /**
   * 处理请求参数，过滤null的字段
   * @param config
   * @returns {{[p: string]: *}}
   */
  filterParams (config) {
    // 过滤 undefined params
    const { params = {} } = config
    let temp = {}
    Object.keys(params).forEach(key => {
      if (params[key] || +params[key] === 0) {
        temp[key] = params[key]
      }
    })
    return {
      ...config,
      params: temp
    }
  }

  returnToLoginIn (code) {
    // local.remove('TOKEN')
    // window.document.cookie = 'token=;'
    // clearUserInfo()
    router.push({ name: 'login' })
  }

  /**
   * 处理响应错误信息
   * @param error
   * @returns {Promise<never>}
   */
  handleError (error) {
    store.commit('SET_LOADING', false)
    if (!error.response) {
      Toast.success(error.message)
      return Promise.reject(error)
    }
    const { status, data: { message, code } } = error.response
    switch (status) {
      case 500:
        if (message) {
          Toast(message)
        } else {
          Toast.fail('网络错误,请稍后再试...')
        }
        break
      case 400:
        if (message) {
          Toast(message)
        }
        break
      case 404:
        Toast.fail(`${message || 'Not Found'}`)
        break
      case 401:
        Toast.fail('身份过期，请重新登录')
        this.returnToLoginIn(code)
        break
      default:
        Toast.fail(`${message || '未知错误'}`)
        break
    }
    return Promise.reject(error)
  }
}

export default new BaseAxiosHelper()
