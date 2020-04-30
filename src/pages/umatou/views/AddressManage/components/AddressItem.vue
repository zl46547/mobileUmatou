<template>
  <div class="address-item van-hairline--bottom" @click="handleClick">
    <!-- 编辑状态不显示checkbox -->
    <div class="checkbox-left" v-if="!type">
      <i class="iconfont icon-checkbox-blank" v-if="!addressItem.isDefault"></i>
      <i class="iconfont icon-checkbox-marked" v-if="addressItem.isDefault"></i>
    </div>
    <div class="checkbox-right">
      <p>{{addressItem.contactName}},{{addressItem.contactTel}}</p>
      <p>{{formatArea(addressItem.area)}}{{addressItem.addressDetail}}</p>
    </div>
    <i class="iconfont icon-edit" v-if="type" @click="goToEdit"></i>
    <i class="iconfont icon-location" v-else></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ADDRESS_SELECTED} from '../../../vuex/types'

  export default {
    props: {
      addressItem: {
        required: true,
        type: Object
      }
    },
    mounted() {
      let {type} = this.$route.params
      if (type) {
        this.type = Number(type)
      }
    },
    data () {
      return {
        type: 0
      }
    },
    methods: {
      /**
       * 跳转编辑页面
       */
      goToEdit() {
        this.$router.push({name: '添加地址', query: {id: this.addressItem._id}})
      },
      /**
       * 点击复选框
       */
      handleClick () {
        // 编辑状态不可点击
        if (this.type) {
          return false
        }
        this.$store.commit(ADDRESS_SELECTED, this.addressItem)
        this.$router.go(-1)
      },
      /**
       * 格式化地区
       */
      formatArea (area) {
        if (!area) {
          return null
        }
        return area.map(item => item.name).join('')
      },
      /**
       * 点击复选框
       * @param index
       * @param productId
       */
      handleCheckboxClick (index, productId) {
        let checkedStatus = !this.addressItem.addressItemList[index].checked
        this.$emit('handle-checkbox-click', {productId, checkedStatus})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  .address-item {
    background-color: #fff;
    display: flex;
    align-items: center;
    width: 100%;
    .checkbox-left {
      width: 10%;
      text-align: center;
      cursor: pointer;

      .icon-checkbox-blank {
        font-size: 30rem/@baseFontSize;
        color: #b1b1b1;
      }

      .icon-checkbox-marked {
        font-size: 30rem/@baseFontSize;
        color: @themeColor;
      }
    }
    .icon-location, .icon-edit {
      display: block;
      width: 60rem/@baseFontSize;
      text-align: center;
      font-size: 30rem/@baseFontSize;
      cursor: pointer;
    }
    .checkbox-right {
      flex: 1;
      padding: 20rem/@baseFontSize;
      p {
        &:nth-of-type(1) {
          font-size: 24rem/@baseFontSize;
          font-weight: bold;
          color: #666;
          margin-bottom: 10rem/@baseFontSize;
        }
        &:nth-of-type(2) {
          color: #b1b1b1;
        }
      }
    }
  }
</style>
