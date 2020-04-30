import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login'
import common from './modules/common'
import tkTools from './modules/tkTools'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        common,
        tkTools
    }
})
