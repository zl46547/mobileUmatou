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
