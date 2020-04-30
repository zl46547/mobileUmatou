import { Toast } from 'vant'
import store from '../vuex/store.js'
import router from '../router'

class BaseAxiosHelper {
  /**
   * 处理请求参数，过滤null的字段
   * @param config
   * @returns {{params}}
   */
  filterParams (config) {
    let user = store.state.login.user
    if (user) {
      config.params = {
        ...config.params,
        customer_guid: user.customer_guid
      }
    }
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

  /**
   * 处理响应错误信息
   * @param error
   * @returns {Promise<never>}
   */
  handleError (error) {
    if (!error.response) {
      Toast.error('服务出错了~')
      return Promise.reject(error)
    }
    const { status, data: { Message } } = error.response
    console.log(error.response)
    switch (status) {
      case 500:
        if (Message) {
          Toast(Message)
        } else {
          Toast.fail('网络错误,请稍后再试...')
        }
        break
      case 400:
        if (Message) {
          Toast(Message)
        }
        break
      case 404:
        Toast.fail(`${Message || 'Not Found'}`)
        break
      case 401:
        Toast.fail({
          duration: 2000,
          message: '身份过期，请重新登录'
        })
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        break
      default:
        Toast.fail(`${error || '未知错误'}`)
        break
    }
    return Promise.reject(error)
  }
}

export default new BaseAxiosHelper()
