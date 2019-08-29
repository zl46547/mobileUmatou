<template>
  <div id="add-address">
    <Navigator>
      <span slot="title">添加地址</span>
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
    <div class="add-address-btn" @click="handleAddAddress()">
      确定
    </div>
    <Popup v-model="showArea"
           position="bottom"
    >
      <Area :area-list="areaList"
            @confirm="handleAreaConfirm"
            @cancel="showArea=false"
      />
    </Popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/navigator.vue'
  import {addAddress} from './service'
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
    methods: {
      handleAreaClick() {
        this.showArea = true
        this.errorMsg.err_area = null
      },
      handleAreaConfirm(val) {
        this.params.area = val
        this.showArea = false
      },
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
        if (!contactTel.match(/^(1[3456789])\d{9}$/)) {
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
      handleAddAddress() {
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        if (!this.beforeSubmit()) {
          return false
        }
        try {
          addAddress({customerGuid, ...this.params}).then(res => {
            if (res) {
              Toast.success('添加成功')
              this.$router.go(-1)
            } else {
              Toast.fail('添加失败')
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #add-address {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .content {
      margin-top: 45px;
      background-color: #f2f2f2;
      flex: 1;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      .van-cell__title {
        max-width: 90px;
      }

      .van-cell__value {
        text-align: left;
      }

      input, textarea{
        color: #323233;
        width: 100%;
        &::-webkit-input-placeholder {
          color: #969799;
        }
      }
      .van-field__control {
        font-size: 1.2rem;
      }
    }

    .add-address-btn {
      border-radius: 6px;
      background-color: #49aa34;
      color: #fff;
      text-align: center;
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
</style>
