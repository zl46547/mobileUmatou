<template>
  <div id="TK-tools">
    <Navigator>
      <span slot="title">制作海报</span>
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
              <Field
                v-model="form.keyword"
                required
                clearable
                label="商品关键字："
                placeholder="请输入商品关键字"
              />
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
            <img id= "preview-img" src="" alt="">
          </div>
          <div class="save-btn-wrap">
            <Button type="primary" @click="saveAsImage">生成图片</Button>
            <Button type="info" @click="searchList">查看列表</Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import {Overlay, Switch, Uploader, Field, Cell, CellGroup, Button, Tab, Tabs} from 'vant'
  import html2canvas from 'html2canvas'
  import utils from '../../util/common'
  import * as types from '../../vuex/types'

  export default {
    components: {
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
        form: {
          fileList: [],
          productName: '',
          keyword: '',
          price: '',
          coupon: '',
          afterCouponPrice: '',
          rebate: '',
          afterRebatePrice: '',
          isFirstOrder: false,
          url: ''
        }
      }
    },
    filters: {
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
          console.log(value)
          return value.content
        }
        return null
      }
    },
    methods: {
      tabClick(name) {
        let image = document.querySelector('#preview-img')
        if (image && name === 1) {
          image.src = ''
        }
      },
      searchList() {
        this.$router.push({name: '海报列表'})
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
          let list = utils.getLocal('TAO_KE_LIST') || []
          let res = list.find(item => item.code === this.form.code)
          if (res) {
            return false
          }
          list.unshift(this.form)
          utils.setLocal('TAO_KE_LIST', list)
        } catch (e) {
          console.log(e)
        }
      },
      handleChange({target: {value}}) {
        let emptyValue = value.replace(/\s/g, '').split('★')
        this.form.productName = emptyValue[0]
        this.form.price = emptyValue[1].replace(/(【原价】:|元)/g, '')
        this.form.coupon = emptyValue[4].replace(/(【优惠金额】:|元优惠券)/g, '')
        this.form.afterCouponPrice = (this.form.price - this.form.coupon).toFixed(2)
        this.form.rebate = Number(emptyValue[3].replace(/【预计返利】:|元/g, '')).toFixed(2)
        this.form.afterRebatePrice = (this.form.afterCouponPrice - this.form.rebate).toFixed(2)
        this.form.url = emptyValue[5].substring(emptyValue[5].indexOf('h'), emptyValue[5].indexOf('￥'))
        let startIndex = emptyValue[5].indexOf('￥')
        let endIndex = emptyValue[5].indexOf('￥', startIndex + 1) + 1
        this.form.code = emptyValue[5].substring(startIndex, endIndex)
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

  #TK-tools {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .content {
      margin-top: 4rem;
      padding:0 2rem;
      flex: 1;
      background-color: #fff;
      overflow-y: auto;
      .base-setting-wrap{
        margin-top: 1rem;
        max-height: calc(100vh - 10rem);
        overflow: auto;
      }
      .preview {
        background-color: #ddd;
        max-height: calc(100vh - 15rem);
        overflow: auto;
        position: relative;
        #preview-img{
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
  }
</style>
