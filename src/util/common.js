/**
 * 用于设置或者获取localStorage
 * @type {string}
 */
const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
export default {
    /**
     * 获取浏览器缓存
     * @param key
     */
    getLocal(key = STORAGE_USER_KEY) {
        let value = window.localStorage.getItem(key)
        return value ? JSON.parse(value) : null
    },
    /**
     * 设置浏览器缓存
     * @param res
     * @param key
     */
    setLocal(key = STORAGE_USER_KEY, res) {
        return window.localStorage.setItem(key, JSON.stringify(res))
    },
    /**
     * 判断对象是否为空
     * @value {Object}
     */
    isEmpty(value) {
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
    encodeURI(str) {
        return encodeURIComponent(encodeURIComponent(str))
    },
    trim(str) {
        return str.toString().replace(/^\s*|\s$/g, '')
    },
    isEmptyObject: function (obj) {
        var name
        for (name in obj) {
            return false
        }
        return true
    },
    /**
     * 深拷贝
     * @param obj
     * @returns {*}
     */
    deepClone: function deepClone(obj) {
        // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
        var objClone = Array.isArray(obj) ? [] : {}
        // 进行深拷贝的不能为空，并且是对象或者是
        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepClone(obj[key])
                } else {
                    objClone[key] = obj[key]
                }
            }
        }
        return objClone
    },

    /**
     * @method 弹簧函数（事件结束后才触发）
     * @param {function} Func 函数
     * @param {int} time 弹性时间
     */
    debounce(Func, time = 500) {
        let current = null
        return function (...args) {
            if (current) {
                clearTimeout(current)
            }
            current = setTimeout(() => {
                Func.apply(this, args)
                current = null
            }, time)
        }
    },
    /**
     * @method 节流函数(固定时间内只会触发一次)
     * @param {function} Func 函数
     * @param {int} time 节流时间
     */
    throttle(Func, time = 500) {
        let current = null
        let argsNew = []
        return function (...args) {
            argsNew = args
            if (current === null) {
                current = setTimeout(() => {
                    Func.apply(this, argsNew)
                    current = null
                }, time)
            }
        }
    },
    /**
     * 回到顶部
     * @param dom
     * @param callback
     */
    backToTop(dom, callback) {
        let timer = setInterval(() => {
            var top = dom.scrollTop
            let speed = Math.ceil(top / 5)
            dom.scrollTop = top - speed
            if (top === 0) {
                if (callback) {
                    callback()
                }
                clearInterval(timer)
            }
        }, 20)
    }
}
