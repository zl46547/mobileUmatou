<template>
  <div id="bounceContent">
    <v-menu-select @menu-selected="clickedNavBar" :menuItems="navBarList" :selected="activeNavBar"></v-menu-select>
    <div v-if="activeNavBar == 1" class="navbarBody-one">
      <div class="usefulCoupon" v-for="(item,i) in usefulCoupon" :key="i" @click="checkCoupon(item)"
           v-if="usefulCoupon">
        <div class="checkbox">
          <i class="iconfont icon-uncheck" v-if="item.Id !== newCheckedItem.Id"></i>
          <i class="iconfont icon-checked" v-if="item.Id === newCheckedItem.Id"></i>
        </div>
        <div class="couponCard">
          <v-coupon-card :coupon="item"></v-coupon-card>
        </div>
      </div>
    </div>
    <div v-if="activeNavBar == 1" class="comfirm" @click="comfirm">
      <p>确定</p>
    </div>
    <!-- 不可使用的优惠券 -->
    <div v-if="activeNavBar == 0" class="navbarBody-two">
      <div v-for="(item,i) in unUsefulCoupon" :key="i" v-if="unUsefulCoupon">
        <v-coupon-card :coupon="item"></v-coupon-card>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MenuSelect from '@/common/menuSelect.vue'
  import CouponCard from './couponCard.vue'
  export default {
    props: {
      usefulCoupon: {
        required: true,
        default: []
      },
      unUsefulCoupon: {
        required: true,
        default: []
      },
      checkedItem: {
        required: true,
        default: []
      }
    },
    computed: {
      getNewCheckedItem() {
        var vm = this
        vm.newCheckedItem = vm.checkedItem
        return vm.checkedItem
      }
    },
    data () {
      return {
        newCheckedItem: '',
        activeNavBar: 1,
        navBarList: [
          {
            name: '可用优惠券',
            label: 1
          },
          {
            name: '不可用优惠券',
            label: 0
          }
        ]
      }
    },
    components: {
      'VMenuSelect': MenuSelect,
      'VCouponCard': CouponCard
    },
    methods: {
      /**
       * 勾选优惠券
       * @param val
       */
      checkCoupon (val) {
        this.newCheckedItem = val
      },
      /**
       * 确认按钮事件
       */
      comfirm () {
        this.$emit('comfirm-selected-item', this.newCheckedItem)
      },
      /**
       * navbar切换事件
       * @param val
       */
      clickedNavBar (val) {
        var vm = this
        vm.activeNavBar = val
      }
    }
  }
</script>

<style lang="less" scoped>

  #bounceContent {
    height: calc(70vh - 50px);
    .navbarBody-one {
      height: calc(100% - 55px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none
      }
      .usefulCoupon {
        display: table;
        width: 90%;
        margin: 1.9vh auto;
        transform: translate(-2%);
        .checkbox {
          display: table-cell;
          vertical-align: middle;
          cursor: pointer;
          .icon-uncheck {
            font-size: 1.5rem;
            color: #b1b1b1;
          }
          .icon-checked {
            font-size: 1.5rem;
            color: #00d300;
          }
        }
        .couponCard {
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
    .comfirm {
      font-size: 1.3rem;
      cursor: pointer;
      width: 50%;
      height: 35px;
      background-color: #ff2b1c;
      display: flex;
      margin: 10px auto;
      border-radius: 90px;
      p {
        margin: auto;
        color: #fff;
      }
    }
    .navbarBody-two {
      height: 100%; // 60px为navbar切换的高度，10px为距底部的距离
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none
      }
      > div {
        display: table;
        width: 80%;
        margin: 1.9vh auto;
      }
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTYVw03EAAAd4AAAAHEdERUYAKQAMAAAHWAAAAB5PUy8yPJRJAQAAAVgAAABWY21hcOaP0QkAAAHEAAABUmdhc3D//wADAAAHUAAAAAhnbHlmMiQxLAAAAygAAAFcaGVhZBLr8GUAAADcAAAANmhoZWEHiQOFAAABFAAAACRobXR4DFYAqwAAAbAAAAAUbG9jYQDoAH4AAAMYAAAADm1heHABFgAzAAABOAAAACBuYW1lKeYRVQAABIQAAAKIcG9zdBomo7AAAAcMAAAAQwABAAAAAQAAITvXZV8PPPUACwQAAAAAANfmVjQAAAAA1+ZWNABV/9UDqwMrAAAACAACAAAAAAAAAAEAAAOA/4AAXAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAAEAAEAAAAGACcABgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5ibnDwOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAAEAAAABAAAVgBWAFUAAAADAAAAAwAAABwAAQAAAAAATAADAAEAAAAcAAQAMAAAAAgACAACAADmJuZ15w///wAA5ibmdecP//8Z3RmPGPYAAQAAAAAAAAAAAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgB+AK4AAAACAFb/1gOrAysAGgAgAAABDgEHLgEnPgE3Mhc3Jg4DFB4CMj4CNyUHFwEnAQNVA8GRkcEDA8GRMS1DTaqbeUBAeZusm3lAAf2mPMABqzz+kQGAkcEDA8GRkcEDDUMgAUB5m6ybeUBAeZtWUj3AAas9/pEAAAYAVgErA6sB1QAAAAwADQAZABoAJgAAATUOARQWFzI+ATQuAQU1DgEUFhcyPgE0LgEFNQ4BFBYXMj4BNC4BA1UkMDAkGCYYGCb+kyQwMCQXJxcXJ/6UJTAwJRcnFxcnAYBVATBIMAEWKSwpFlVVATBIMAEWKSwpFlVVATBIMAEWKSwpFgAAAAACAFX/1QOrAysADgAaAAAlLgEnPgE3Mh4CFA4CAw4BBx4BFz4BNy4BAgCRwQMDwZFEfWEzM2F9RLXxBQXxtbXxBQXxKwPBkZHBAzNhfYh9YTMDAAXxtbXxBQXxtbXxAAAAABIA3gABAAAAAAAAABUALAABAAAAAAABAAgAVAABAAAAAAACAAcAbQABAAAAAAADAAgAhwABAAAAAAAEAAgAogABAAAAAAAFAAsAwwABAAAAAAAGAAgA4QABAAAAAAAKACsBQgABAAAAAAALABMBlgADAAEECQAAACoAAAADAAEECQABABAAQgADAAEECQACAA4AXQADAAEECQADABAAdQADAAEECQAEABAAkAADAAEECQAFABYAqwADAAEECQAGABAAzwADAAEECQAKAFYA6gADAAEECQALACYBbgAKAEMAcgBlAGEAdABlAGQAIABiAHkAIABpAGMAbwBuAGYAbwBuAHQACgAACkNyZWF0ZWQgYnkgaWNvbmZvbnQKAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABSAGUAZwB1AGwAYQByAABSZWd1bGFyAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAABHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuAABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAABodHRwOi8vZm9udGVsbG8uY29tAAACAAAAAAAAAAoAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAYAAAABAAIBAgEDAQQHY2hlY2tlZARtb3JlB3VuY2hlY2sAAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABQABAAQAAAACAAAAAAAAAAEAAAAA1aQnCAAAAADX5lY0AAAAANfmVjQ=) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-uncheck:before {
      content: "\e70f";
    }

    .icon-more:before {
      content: "\e675";
    }

    .icon-checked:before {
      content: "\e626";
    }
  }

  @media screen and (min-width: 400px) {
    #bounceContent {
      .navbarBody-one {
        height: calc(100% - 85px);
        .usefulCoupon {
          .checkbox {
            .icon-uncheck {
              font-size: 2rem;
            }
            .icon-checked {
              font-size: 2rem;
            }
          }
        }
      }
      .comfirm {
        font-size: 1.5rem;
        height: 45px;
        margin: 20px auto;
      }
    }
  }
</style>
