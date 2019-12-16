<template>
  <div id="TK-add">
    <Navigator>
      <span slot="title">淘客助手-添加商品</span>
    </Navigator>
    <div class="content">
      <Tabs @click="tabClick">
        <Tab title="基础配置">
          <div class="base-setting-wrap">
            <Uploader
              v-model="form.fileList"
              :multiple="true"
            />
            <Field
              v-model="textArea"
              rows="4"
              autosize
              label="自动识别"
              type="textarea"
              placeholder="请输入内容"
              @change="handleChange"
            />
            <CellGroup>
              <Cell title="截止日期：">
                <template slot="right-icon">
                  <div class="sp-wrap_text" @click="deadlineModal = true">
                    <span>{{form.deadline |formateDeadline}}</span>
                    <span v-if="!form.deadline">请选择日期</span>
                    <Icon v-if="form.deadline" name="clear"
                          @click="form.deadline=null"/>
                  </div>
                  <DatePicker
                    :visible="deadlineModal"
                    title="选择日期"
                    @cancel="deadlineModal=false"
                    @confirm="datePickerComfirm"
                    v-model="form.deadline"
                  />
                </template>
              </Cell>
              <Field
                v-model="form.productName"
                required
                clearable
                label="商品名称："
                placeholder="请输入商品名称"
              />
              <Field
                v-model="form.price"
                type="number"
                required
                clearable
                label="商品原价："
                placeholder="请输入商品原价"
                @change="handlePriceChange"
              />
              <Field
                v-model="form.coupon"
                type="number"
                required
                clearable
                label="优惠券金额："
                placeholder="请输入优惠券金额"
              />
              <Field
                v-model="form.afterCouponPrice"
                type="number"
                required
                clearable
                label="券后价："
                placeholder="请输入券后价"
              />
              <Field
                v-model="form.rebate"
                type="number"
                required
                clearable
                label="返利金额："
                placeholder="请输入返利金额"
                @change="handleRebateChange"
              />
              <Field
                v-model="form.afterRebatePrice"
                type="number"
                required
                clearable
                label="到手价："
                placeholder="请输入到手价"
              />
              <Cell title="是否是首单：">
                <VSwitch slot="right-icon"
                         v-model="form.isFirstOrder"
                         size="24px"
                         active-color="#07c160" inactive-color="#ddd"
                />
              </Cell>
            </CellGroup>
          </div>
        </Tab>
        <Tab title="预览">
          <div class="preview">
            <div id="preview-wrap">
              <div class="preview-pic-list">
                <img :src="form.fileList[0] |formatImage" alt="">
                <img :src="form.fileList[1] |formatImage" alt="">
                <img :src="form.fileList[2] |formatImage" alt="">
              </div>
              <div class="product-info">
                <p class="product-name">{{form.productName}}</p>
                <p class="price-container" v-if="!form.isFirstOrder">
                  <span class="price-label">原价</span>
                  <span class="price">¥{{form.price}}</span>
                </p>
                <div class="price-container" v-else>
                  <span class="first-order-tag">首单</span>
                  <div class="coupon-after-price">
                    <span>¥</span>
                    <span>{{form.price | getInteger}}.</span>
                    <span class="decimal">{{form.price | getDecimal}}</span>
                  </div>
                </div>
                <div class="coupon-after-container coupon-after-container-bt">
                  <div class="tag">
                    <p>券</p>
                    <p>{{form.coupon}}元</p>
                  </div>
                  <div class="coupon-after-label">
                    付费价
                  </div>
                  <div class="coupon-after-price">
                    <span>¥</span>
                    <span>{{form.afterCouponPrice | getInteger}}.</span>
                    <span class="decimal">{{form.afterCouponPrice | getDecimal}}</span>
                  </div>
                </div>
                <div class="coupon-after-container">
                  <div class="tag">
                    <p>返</p>
                    <p>{{form.rebate}}元</p>
                  </div>
                  <div class="coupon-after-label">
                    到手价
                  </div>
                  <div class="coupon-after-price">
                    <span>¥</span>
                    <span>{{form.afterRebatePrice | getInteger}}.</span>
                    <span class="decimal">{{form.afterRebatePrice | getDecimal}}</span>
                  </div>
                </div>
              </div>
            </div>
            <img id="preview-img" src="" alt="">
          </div>
          <div class="save-btn-wrap">
            <Button type="primary" @click="saveAsImage">生成图片</Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import DatePicker from '../../common/DatePicker'
  import {Icon, Overlay, Switch, Uploader, Field, Cell, CellGroup, Button, Tab, Tabs} from 'vant'
  import html2canvas from 'html2canvas'
  import * as types from '../../vuex/types'
  import {addProduct} from './service'
  import dayjs from 'dayjs'

  export default {
    components: {
      Icon,
      DatePicker,
      Tab,
      Tabs,
      Navigator,
      VSwitch: Switch,
      Uploader,
      Field,
      Cell,
      CellGroup,
      Button,
      Overlay
    },
    data() {
      return {
        textArea: '',
        deadlineModal: false,
        form: {
          deadline: '',
          fileList: [],
          productName: '',
          price: '',
          coupon: '',
          code: '',
          afterCouponPrice: '',
          rebate: '',
          afterRebatePrice: '',
          isFirstOrder: false
        }
      }
    },
    filters: {
      formateDeadline(value) {
        if (!value) {
          return null
        }
        return dayjs(value).format('YYYY-MM-DD')
      },
      getInteger(value) {
        value = Number(value).toFixed(2).split('.')
        return value[0]
      },
      getDecimal(value) {
        value = Number(value).toFixed(2).split('.')
        return value[1]
      },
      formatImage(value) {
        if (value) {
          return value.content
        }
        return null
      }
    },
    methods: {
      datePickerComfirm(val) {
        this.form.deadline = val
        // this.$emit('selectd', val)
        this.deadlineModal = false
      },
      tabClick(name) {
        let image = document.querySelector('#preview-img')
        if (image && name === 1) {
          image.src = ''
        }
      },
      saveAsImage() {
        try {
          this.$store.commit(types.SET_LOADING, true)
          html2canvas(document.querySelector('#preview-wrap')).then(canvas => {
            let image64 = canvas.toDataURL('image/png', 1)
            let image = document.querySelector('#preview-img')
            image.src = image64
            this.$store.commit(types.SET_LOADING, false)
          })
          addProduct(this.form)
        } catch (e) {
          console.log(e)
        }
      },
      handleChange({target: {value}}) {
        let emptyValue = value.split(/\n|\r/)
        this.form.productName = emptyValue[0].replace(/【包邮】/g, '')
        this.form.price = emptyValue[1].replace(/(【在售价】|元)/g, '')
        this.form.afterCouponPrice = emptyValue[2].replace(/(【券后价】|元)/g, '')
        this.form.coupon = (this.form.price - this.form.afterCouponPrice).toFixed(2)
        this.form.rebate = Number(emptyValue[4].replace(/返利/g, '')).toFixed(2)
        this.form.afterRebatePrice = (this.form.afterCouponPrice - this.form.rebate).toFixed(2)
        this.form.code = emptyValue[6]
      },
      handlePriceChange() {
        this.form.afterCouponPrice = (this.form.price - this.form.coupon).toFixed(2)
      },
      handleRebateChange() {
        this.form.afterRebatePrice = (this.form.afterCouponPrice - this.form.rebate).toFixed(2)
      }
    }
  }
</script>

<style lang="less" scoped>

  #TK-add {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .content {
      margin-top: 4rem;
      padding: 0 2rem;
      flex: 1;
      background-color: #fff;
      overflow-y: auto;

      .base-setting-wrap {
        margin-top: 1rem;
        max-height: calc(100vh - 10rem);
        overflow: auto;
      }

      .preview {
        background-color: #ddd;
        max-height: calc(100vh - 15rem);
        overflow: auto;
        position: relative;

        #preview-img {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 9;
        }

        #preview-wrap {
          background-color: #fff;
          margin: 20px;
          border-radius: 5px;

          .preview-pic-list {
            display: flex;
            flex-wrap: wrap;
            font-size: 0;

            img:nth-of-type(1) {
              width: 100%;
              height: 30rem;
            }

            img:nth-of-type(2), img:nth-of-type(3) {
              width: 50%;
              height: 15rem;
            }
          }

          .product-info {
            padding: 16px;

            .product-name {
              font-size: 1.8rem;
              color: #333;
              margin-bottom: 10px;
            }

            .price-container {
              margin-bottom: 16px;
              display: flex;
              align-items: center;

              .first-order-tag {
                display: inline-block;
                border: 1px solid #f00000;
                color: #f00000;
                border-radius: 3px;
                margin-right: 14px;
                text-align: center;
                font-size: 1.4rem;
                width: 38px;
                padding: 3px;
              }

              .first-order-price {
                color: #ff3a00;
                font-size: 1.4rem;
              }

              .price, .price-label {
                color: #ccc;
                font-size: 1.6rem;
              }

              .price {
                text-decoration: line-through;
              }
            }

            .coupon-after-container {
              display: flex;
              align-items: center;
            }

            .coupon-after-container-bt {
              margin-bottom: 16px;
            }

            .tag {
              display: flex;
              border-radius: 3px;
              border: 1px solid #ff3a00;
              margin-right: 14px;

              p {
                height: 3rem;
                line-height: 3rem;
                text-align: center;
                font-size: 1.4rem;

                &:first-of-type {
                  width: 3rem;
                  background-color: #ff3a00;
                  color: #fff;
                }

                &:last-of-type {
                  width: 5rem;
                  color: #ff3a00;
                }
              }
            }

            .coupon-after-label {
              font-size: 1.6rem;
              color: #333;
              margin-right: 5px;
            }

            .coupon-after-price {
              display: flex;
              align-items: baseline;
              color: #ff3a00;
              font-size: 2.4rem;
              font-weight: 400;

              span:first-of-type {
                font-size: 1.4rem;
                margin-right: 2px;
              }

              .decimal {
                font-size: 1.4rem;
              }
            }
          }
        }
      }

      .save-btn-wrap {
        margin-top: 10px;
        text-align: center;
      }
    }
    .sp-wrap_text{
      display: flex;
      align-items: center;
    }
    .van-icon-clear{
      font-size: 1.6rem;
      margin-left: 5px;
      color: #aaa;
    }
    .van-cell__title{
      width: 90px;
      flex: none;
    }
  }
</style>
