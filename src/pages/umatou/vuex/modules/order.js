import * as types from '../types'
import {getOrderList} from '../../views/AllOrders/service'

const state = {
    addressSelected: null, // 选择地址
    couponSelected: null, // 选择优惠券
    payWay: 0, // 支付方式
    remainTime: 1, // 剩余支付时间
    orderStatusCode: null, // 订单状态码
    allOrders:[], // 所有订单

}

const mutations = {
    // 选择地址
    [types.ADDRESS_SELECTED](state, res) {
        state.addressSelected = res
    },
    // 选择优惠券
    [types.COUPON_SELECTED](state, res) {
        state.couponSelected = res
    },
    // 支付方式
    [types.PAY_WAY](state, res) {
        state.payWay = res
    },
    // 剩余支付时间
    [types.REMAIN_TIME](state, res) {
        state.remainTime = res
    },
    // 订单查询
    [types.QUERY_ORDERS](state, res) {
        state.allOrders = res
    },
    // 订单状态
    [types.ORDER_STATUS_CODE](state, res) {
        state.orderStatusCode = res
    }
}

const actions = {
    queryOrdersAction({commit}, orderStatusCode) {
        commit(types.ORDER_STATUS_CODE, orderStatusCode)
        getOrderList({
            orderStatusCode
        }).then(res => {
            commit(types.QUERY_ORDERS, res)
        })
    }
}


export default {
    state,
    mutations,
    actions
}
