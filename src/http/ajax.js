import * as $ from 'jquery'
import store from '@/vuex/store.js'
import util from '../util/common.js'

export default {
  /**
   * 用于跨域请求
   * @url {string}
   * @params {Object}
   * @fun {function}
   */
  ajax (url, params, fun) {
    if (!util.isEmpty(params)) {
      url = 'https://wechatx.34580.com/sz' + url + '?'
      for (var key in params) {
        var value = params[key]
        if (Object.prototype.toString.call(params[key]) === '[object Object]') {
          value = encodeURI(JSON.stringify(value))
        }
        url += key + '=' + value + '&'
      }
    }
    $.ajax({
      url: 'http://query.yahooapis.com/v1/public/yql',
      dataType: 'jsonp',
      beforeSend: function () {
        store.commit('SET_LOADING', true)
      },
      async: false,
      data: {
        q: 'select * from json where url=\"' + url + '\"',
        format: 'json'
      },
      success: function (res) {
        if (util.isEmpty(res.query.results)) {
          console.log('请求失败了！')
        }
        store.commit('SET_LOADING', false)
        return fun(res)
      }
    })
  }
}
