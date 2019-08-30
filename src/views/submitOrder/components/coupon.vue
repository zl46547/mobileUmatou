<template>
  <div id="coupon">
    <div class="coupon-select-wapper" @click="showModal()">
      <p class="title">优惠券</p>
      <div class="coupon-selected">{{couponSelected}}</div>
      <p class="arrow-right"><span class="iconfont icon-arrow-right"></span></p>
    </div>
    <ActionSheet v-model="openModal" title="优惠券选择">
      <div class="modal-content">
        <div class="modal-body">
          <div class="coupon-item"
               v-for="item in couponList"
               :key="item._id"
               @click="handleCheckboxClick(item)"
          >
            <CouponCard :coupon="item"
                        :selected="tempSelected.couponName"
            />
          </div>
        </div>
        <div class="confirm" @click="handleConfirm">
          确定
        </div>
      </div>
    </ActionSheet>
  </div>
</template>

<script type="text/ecmascript-6">
  import CouponCard from './couponCard'
  import MenuSelect from '@/common/menuSelect'
  import {ActionSheet} from 'vant'
  import {COUPON_SELECTED} from '../../../vuex/types'
  import {getCoupons} from '../service'
  import moment from 'moment'

  export default {
    props: {
      totalPrice: {
        type: Number,
        required: true,
        default: 0
      }
    },
    mounted() {
      let {user: {customerGuid}} = this.$store.state.login
      if (!customerGuid) {
        return false
      }
      try {
        getCoupons({customerGuid}).then(res => {
          this.couponList = this.formatCouponList(res)
        })
      } catch (e) {
        console.log(e)
      }
    },
    data() {
      return {
        openModal: false,
        couponList: [],
        couponSelected: '无可用优惠券',
        tempSelected: ''
      }
    },
    components: {
      ActionSheet,
      MenuSelect,
      CouponCard
    },
    methods: {
      /**
       * 显示对话框
       * 获取优惠券列表
       */
      showModal() {
        this.openModal = true
      },
      formatCouponList(couponList) {
        let useful = []
        let notFit = []
        let outOfDate = []
        let hasUsed = []
        for (let i = 0; i < couponList.length; i++) {
          // 已过期优惠券
          if (couponList[i].status === 1 &&
            moment(couponList[i].endTime).diff(moment(), 'days') < 0) {
            couponList[i].status = 3
            outOfDate.push(couponList[i])
            continue
          }
          // 不满足最小使用金额
          if (couponList[i].status === 1 && couponList[i].limitMinMoney > this.totalPrice) {
            couponList[i].status = 4
            notFit.push(couponList[i])
            continue
          }
          // 已使用
          if (couponList[i].status === 2) {
            hasUsed.push(couponList[i])
            continue
          }
          // 可使用
          useful.push(couponList[i])
        }
        this.couponSelected = useful.length > 0 ? `有${useful.length}张优惠券可使用` : '暂无可使用优惠券'
        return [...useful, ...notFit, ...outOfDate, ...hasUsed]
      },
      /**
       * 点击优惠券
       * @param item
       * @returns {boolean}
       */
      handleCheckboxClick(item) {
        if (item.status !== 1) {
          return false
        }
        this.tempSelected = item
      },
      /**
       * 确认优惠券
       */
      handleConfirm() {
        this.openModal = false
        this.couponSelected = this.tempSelected.couponName
        this.$store.commit(COUPON_SELECTED, this.tempSelected)
      }
    }
  }
</script>

<style lang="less" scoped>
  #coupon {
    border-bottom: 1px solid #eee;
    padding: 15px;
    background-color: #fff;
    position: relative;

    .coupon-select-wapper {
      display: flex;
      align-items: center;

      .title {
        color: #333;
        width: 6rem;
        text-align: right;
        font-size: 1.3rem;
        margin-right: 1rem;
      }

      .coupon-selected {
        font-size: 1.2rem;
        color: #c0c0c0;
      }

      .arrow-right {
        color: #333;
        font-size: 1rem;
        flex: 1;
        text-align: right;
      }
    }

    .modal-content {
      height: 50vh;
      position: relative;

      .modal-body {
        padding: 0 2rem;
        height: calc(100% - 50px);
        overflow-y: auto;

        .coupon-item {
          margin-top: 1.5rem;

          &:last-of-type {
            margin-bottom: 1.5rem;
          }
        }
      }

      .confirm {
        position: absolute;
        bottom: 0;
        cursor: pointer;
        font-size: 1.3rem;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        background-color: #ff2b1c;
        color: #fff;
        text-align: center;
        width: 100%;
      }
    }
  }
</style>
