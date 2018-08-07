/**
 * 用于设置或者获取localStorage
 * @type {string}
 */
const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
export default {
  getLocal (key = STORAGE_USER_KEY) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  setLocal (res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    if (isSaveOldData && this.getLocal(key) instanceof Array) {
      let oldData = this.getLocal(key)
      return window.localStorage.setItem(JSON.stringify(res.contain(oldData)))
    }
    return window.localStorage.setItem(key, JSON.stringify(res))
  },
  /**
   * 判断对象是否为空
   * @value {Object}
   */
  isEmpty (value) {
    var vm = this
    var flag = false
    if (value !== undefined && value !== null) {
      switch (Object.prototype.toString.apply(value)) {
        case '[object String]':
          value = vm.trim(value.toLocaleLowerCase())
          flag = (value === 'undefined' || value === 'null' || value.length < 1)
          break
        case '[object Number]':
          break
        case '[object Boolean]':
          break
        case '[object Object]':
          flag = vm.isEmptyObject(value)
          break
        case '[object Array]':
          flag = (value.length < 1)
          break
      }
    } else {
      flag = true
    }
    return flag
  },
  encodeURI (str) {
    return encodeURIComponent(encodeURIComponent(str))
  },
  isLogin() {
    // var vm = this
    // var loginTicket = vm.$store.state.common.loginTicket
  },
  /**
   * 将日期转换成日期字符串
   * @param date  日期
   * @param fmt 需要转换的日期格式
   * @returns {*}
   */
  dateFormate (date, fmt) {
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  /**
   * 将时间戳转换成时间字符串
   * @param timestamp
   * @param formate
   * @returns {*}
   */
  timestampToTime (timestamp, formate) {
    var date = new Date(timestamp)
    var dateStr = this.dateFormate(date, formate)
    return dateStr
  },
  trim (str) {
    return str.toString().replace(/^\s*|\s$/g, '')
  },
  isEmptyObject: function (obj) {
    var name
    for (name in obj) {
      return false
    }
    return true
  }
}
