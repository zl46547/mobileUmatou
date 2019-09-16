<template>
  <div id="add-address">
    <Navigator>
      <span slot="title">{{navigatorTitle}}</span>
    </Navigator>
    <div class="content">

      <CellGroup>
        <Field
          v-model="params.contactName"
          @change="errorMsg.err_contact_name = null"
          label="联系人"
          placeholder="请输入联系人姓名"
          :error-message="errorMsg.err_contact_name"
          required
        />
        <Field
          v-model="params.contactTel"
          @focus="errorMsg.err_contact_tel = null"
          label="联系电话"
          placeholder="请输入手机号"
          :error-message="errorMsg.err_contact_tel"
          required
        />
        <Cell
          title="地区"
          required
        >
          <div>
            <p @click="handleAreaClick()">
              <input :value="areaString"
                     disabled="true"
                     placeholder="请输入地区" />
            </p>
            <div class="van-field__error-message">{{errorMsg.err_area}}</div>
          </div>
        </Cell>
        <Field
          v-model="params.addressDetail"
          @focus="errorMsg.err_address_detail = null"
          label="详细地址"
          placeholder="请输入详细地址"
          type="textarea"
          :border="true"
          :error-message="errorMsg.err_address_detail"
          required
        />
        <Cell
          title="设置默认"
        >
          <div>
            <MySwitch
              size="20px"
              v-model="params.isDefault"
              active-color="#07c160"
              inactive-color="#eee"
            ></MySwitch>
          </div>
        </Cell>
      </CellGroup>
    </div>
    <div class="add-address-btn" @click="handleSubmitAddress()">
      确定
    </div>
    <Popup v-model="showArea"
           position="bottom"
    >
      <Area :area-list="areaList"
            :value="params.area"
            @confirm="handleAreaConfirm"
            @cancel="showArea=false"
      />
    </Popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/navigator.vue'
  import {addAddress, getAddressDetail, updateAddress} from './service'
  import {Field, CellGroup, Cell, Area, Popup, Switch, Toast} from 'vant'
  import areaList from '../../util/area'

  export default {
    components: {
      Field,
      CellGroup,
      Cell,
      Area,
      Popup,
      MySwitch: Switch,
      Toast,
      Navigator
    },
    data() {
      return {
        areaList,
        showArea: false,
        navigatorTitle: '添加地址',
        params: {
          contactName: null,
          contactTel: null,
          area: null,
          addressDetail: null,
          isDefault: false
        },
        errorMsg: {
          err_contact_name: null,
          err_contact_tel: null,
          err_area: null,
          err_address_detail: null
        }
      }
    },
    computed: {
      areaString() {
        if (!this.params.area) {
          return null
        }
        return this.params.area.map(item => item.name).join('/')
      }
    },
    mounted() {
      let {id} = this.$route.query
      if (id) {
        this.navigatorTitle = '编辑地址'
        getAddressDetail(id).then(res => {
          this.params = res
        })
      }
    },
    methods: {
      /**
       * 地区选择点击事件
       */
      handleAreaClick() {
        this.showArea = true
        this.errorMsg.err_area = null
      },

      /**
       * 地区选择确认事件
       * @param val
       */
      handleAreaConfirm(val) {
        this.params.area = val
        this.showArea = false
      },

      /**
       * 新增地址参数校验
       * @returns {boolean}
       */
      beforeSubmit() {
        let {
          contactName,
          contactTel,
          area,
          addressDetail
        } = this.params
        if (!contactName) {
          this.errorMsg.err_contact_name = '联系人姓名不能为空'
          return false
        }
        if (!contactTel) {
          this.errorMsg.err_contact_tel = '联系人电话不能为空'
          return false
        }
        if (!String(contactTel).match(/^(1[3456789])\d{9}$/)) {
          this.errorMsg.err_contact_tel = '请输入正确的手机号码'
          return false
        }
        if (!area) {
          this.errorMsg.err_area = '地区不能为空'
          return false
        }
        if (!addressDetail) {
          this.errorMsg.err_address_detail = '地址详情不能为空'
          return false
        }
        return true
      },

      /**
       * 确认新增地址
       * @returns {boolean}
       */
      handleSubmitAddress() {
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        if (!this.beforeSubmit()) {
          return false
        }
        try {
          let {id} = this.$route.query
          if (id) {
            updateAddress({...this.params, id}).then(res => {
              if (res) {
                this.$router.go(-1)
              }
            })
          } else {
            addAddress({customerGuid, ...this.params}).then(res => {
              if (res) {
                this.$router.go(-1)
              }
            })
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #add-address {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .content {
      margin-top: 80rem/@baseFontSize;
      /*background-color: #f2f2f2;*/
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      input, textarea{
        color: #323233;
        width: 100%;
        &::-webkit-input-placeholder {
          color: #969799;
        }
      }

      input:disabled {
        background-color: #fff;
      }

      .van-cell__title{
        width: 90px;
        flex: none;
      }

      .van-cell__value {
        text-align: left;
      }

      .van-cell{
        font-size: 22rem/@baseFontSize;
        padding: 20rem/@baseFontSize 30rem/@baseFontSize;
      }

      .van-field__control {
        font-size: 22rem/@baseFontSize;;
      }
    }

    .add-address-btn {
      cursor: pointer;
      border-radius: 5rem/@baseFontSize;;
      background-color: @themeColor;
      color: #fff;
      text-align: center;
      font-size: 22rem/@baseFontSize;
      height: 70rem/@baseFontSize;
      line-height: 70rem/@baseFontSize;
    }
  }
</style>
